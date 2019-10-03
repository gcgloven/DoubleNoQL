import time
import yaml
import json
import mysql.connector
from mysql.connector import Error
from myinsertion import *
from mydataretrieve import *


starttime = time.time()
#******Attempting to Connect SQL******
db = mysql.connector.connect(user='secret',password = 'secret',
                              host='localhost',
                              database='yourdatabase')

print("Program Start")
domain_file=open('../domain.yml','r')

#******Load Domain.yml content from files******
domain_data = json.dumps(yaml.load(domain_file,Loader=yaml.SafeLoader))
domain_data = json.loads(domain_data)
intent_data = domain_data["intents"]
action_data = domain_data["actions"]
action_custom_data = []
action_utter_data=[]
for action in action_data:
	if action[:6] =="utter_":
		action_utter_data.append(action)
	else:
		action_custom_data.append(action)
slots_data = domain_data["slots"]
templates_data = domain_data["templates"]

#******Run Insertion Methods******
insert_intents(db,intent_data)
insert_actions(db,"utter_",action_utter_data)
insert_actions(db,"custom",action_custom_data)
insert_utterance(db,templates_data)
insert_entity(db,domain_data["entities"])
insert_slot(db,slots_data)
entity_pairs = entity_id_name_pairs(db)
#******Insert Nlu Data******
for json_data in get_all_json():
	insert_data_intents(db,json_data["rasa_nlu_data"]["common_examples"])
	if json_data["rasa_nlu_data"]["lookup_tables"]:
		lookup_tables=json_data["rasa_nlu_data"]["lookup_tables"]
		for lookup_table in lookup_tables:
			entity = lookup_table["name"]
			path = lookup_table["elements"]
			insert_datalookup(db,entity_pairs[entity],path)
#******Insert Stories Data******
basic_story_insert(db)

print(time.time() - starttime)
