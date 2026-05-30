from database.database import SessionLocal

from database.models import UserMemory

def save_memory(user_id,memory_type,content):
    db = SessionLocal()

    memory = UserMemory(
        user_id=user_id,
        memory_type=memory_type,
        content=content
    )

    db.add(memory)
    db.commit()
    db.close()

def get_memories(user_id):
    db = SessionLocal()
    memories = db.query(UserMemory).filter(UserMemory.user_id == user_id).all()
    db.close()
    return memories