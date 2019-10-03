import mysql.connector
from mysql.connector import Error
import time

def insertion(db,query):
	try:
		cur = db.cursor()
		cur.execute(query)
		print(query)
		db.commit()
	except (Error) as e:
		print( "MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
		print("ERROR QUERY: "+ query)
		
def insert_intents(db,intent_data):
	query = """INSERT INTO intents(intent_name) VALUES ("%s");"""
	for name in intent_data:
		ind_query = query%(name)
		insertion(db,ind_query)
		
		
#action Type should be either "utter_" or "custom" 
def insert_actions(db,action_type,action_data):
	query = """INSERT INTO actions(type,action_name) VALUES ("%s","%s");"""
	for name in action_data:
		ind_query = query %(action_type,name)
		insertion(db,ind_query)
		
	
def insert_utterance(db,templates):
	pair=action_id_name_pairs(db)
	utter_names=templates.keys()
	sql_insert_Query = """INSERT INTO utterances(action_id,text) VALUES (%i,"%s")"""	
	cur = db.cursor()
	for utter_name in utter_names:
		action_id = pair[utter_name]
		for texts in templates[utter_name]:
			content= texts["text"]
			query = sql_insert_Query%(action_id,content)
			insertion(db,query)
			
			
def insert_entity(db,entities):
	query = """INSERT INTO entities(entity_name) VALUES ("%s");"""
	for name in entities:
		ind_query = query%(name)
		insertion(db,ind_query)
		
		
def insert_slot(db,slots):
	query = """INSERT INTO slots(slot_name,slot_type) VALUES ("%s","%s");"""
	for slot in slots:
		slot_name = slot
		slot_type = slots[slot]["type"]
		ind_query = query%(slot_name,slot_type)
		insertion(db,ind_query)
		
		
def insert_datalookup(db,id,path):
	query = """INSERT INTO data_lookups(entity_id,path) VALUES (%i,"%s");"""
	ind_query = query%(id,path)
	insertion(db,ind_query)
	
	
def insert_data_intents(db,common_examples):
	pair = intent_id_name_pairs(db)
	query = """INSERT INTO data_intents(intent_id,text) VALUES (%i,"%s");""" 
	for item in common_examples:
		intent = item["intent"]
		text = item["text"]
		if "entities" in item:
			entities = item["entities"]
			add = 0
			for entity in entities:
				ind_entity_name = entity["entity"]
				value = entity["value"]
				start = entity["start"]+add
				end = entity["end"]+add
				output_entity="[%s](%s)"%(value,ind_entity_name)
				lefty = text[:start]
				righty = text[end:]
				#print(start,end,lefty,righty)
				text = lefty +output_entity+ righty
				#print(text)
				add = len(output_entity) + start - end
			insertion(db,query%(pair[intent],text))
		else: 		
			insertion(db,query%(pair[intent],text))
		
def pairing_query(db,query):
	cur = db.cursor()
	cur.execute(query)
	result_list = cur.fetchall()
	pair = dict(result_list)	
	return pair
	
def action_id_name_pairs(db):
	query = """SELECT action_name,id FROM actions WHERE type = "utter_" """
	return pairing_query(db,query)
		
def intent_id_name_pairs(db):
	query = """SELECT intent_name,id FROM intents"""
	return pairing_query(db,query)
	
def entity_id_name_pairs(db):
	query = """SELECT entity_name,id FROM entities"""
	return pairing_query(db,query)
	
		
def basic_story_pairs(db):
	query = """SELECT action_name,id FROM actions WHERE type = "utter_" """
	name_id_pairs = pairing_query(db,query)
	stories = {}
	del name_id_pairs["utter_default"]
	for utter_name in name_id_pairs:
		action_name = utter_name[6:]
		stories['## General '+ action_name] = '* '+action_name +'\n' +'  - ' + utter_name+'\n'
	return stories 

def basic_story_insert(db):
	pairs = basic_story_pairs(db)
	query = """INSERT INTO stories(story_name,content) VALUES ("%s","%s");"""
	for pair in pairs:
		ind_query = query%(pair,pairs[pair])
		insertion(db,ind_query)
		
		 
