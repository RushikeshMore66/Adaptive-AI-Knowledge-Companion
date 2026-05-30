from collections import defaultdict

conversation_memory=defaultdict(list)

def add_message(session_id:str,role:str,content:str):
    conversation_memory[session_id].append({"role":role,"content":content})

def get_conversation(session_id:str):

    return conversation_memory[session_id]