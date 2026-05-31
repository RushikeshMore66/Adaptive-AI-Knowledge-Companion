def calculate_mastery(scores):
    if not scores:
        return 0

    return sum(scores)/len(scores)

def detect_weak_topic(user_id):
    score = 0
    if score < 70:
        return None
    
def readiness(topic):
    skill_score = 0.8
    interview_score = 0.7
    progress_score = 0.9
    return skill_score * 0.4 + interview_score * 0.4 + progress_score * 0.2

