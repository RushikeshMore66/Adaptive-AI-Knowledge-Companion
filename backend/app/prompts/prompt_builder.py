from app.prompts.personality_modes import MODES

def build_prompt(
    mode,
    context,
    questions,
    history
):

    system_prompt = MODES.get(mode,MODES["teacher"])

    history_text ="\n".join([f"{msg['role']}: {msg['content']}" 
                                for msg in history
    ])

    prompt = f"""
    {system_prompt}

    Privious Conversations:
    {history_text}

    Retrieved Knowledge:
    {context}

    User Questions:
    {question}

    Give a conversational and intellegent response based on the above context and history
    """
    return prompt
    
