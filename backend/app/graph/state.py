from typing import TypedDict,List



class AgentState(TypedDict):

    user_id:str
    session_id:str
    message:str
    mode:str
    context:str
    retrieved_docs:List[str]
    score:int
    feedback:str
    response:str
    
