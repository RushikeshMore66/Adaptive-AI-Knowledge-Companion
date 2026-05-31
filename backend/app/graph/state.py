from pydantic import BaseModel

class AgentState(BaseModel):

    user_id:str
    session_id:str
    message:str
    mode:str
    context:str
    retrieved_docs:list
    score:int
    feedback:str
    response:str
    
