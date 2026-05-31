from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class UserMemory(Base):
    __tablename__ = "user_memory"

    id = Column(Integer,primary_key=True)
    user_id = Column(String)
    memory_type = Column(String)
    content = Column(Text) 
    

    
class LearningProgress(Base):
    __tablename__ = "learning_progress"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(String)

    topic = Column(String)

    score = Column(Integer)

    attempts = Column(Integer)

    status = Column(String)