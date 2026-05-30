def calculate_progress(tasks):
    completed = len([
        t for t in tasks 
        if t.status =="completed"])

    return (
        completed /
        len(tasks)
    ) * 100