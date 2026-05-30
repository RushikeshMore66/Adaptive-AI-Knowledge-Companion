from database.database import SessionLocal

from database.models import LearningProgress

def update_score(user_id,topic,score):
    db=SessionLocal()

    progress = db.query(
        LearningProgress
    ).filter(
        LearningProgress.user_id == user_id,
        LearningProgress.topic == topic
    ).first()