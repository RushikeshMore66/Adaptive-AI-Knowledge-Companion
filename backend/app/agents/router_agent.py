def router_request(message:str) -> str:

    text=message.lower()

    if "interview" in text:
        return "interviewer"

    elif "teach" in text or "explain" in text:
        return "tutor"

    elif "learn" in text :
        return "tutor"

    elif "research" in text :
        return "researcher"
    
    return "mentor"
    