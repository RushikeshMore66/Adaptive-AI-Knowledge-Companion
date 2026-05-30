def update_difficulty(current_difficulty,score):

    if score >=8:
        return "advanced"

    if score >=6:
        return "intermediate"
    
    return "beginner"
    

