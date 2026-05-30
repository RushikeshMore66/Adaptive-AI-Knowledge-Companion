from graph_memory.graph_manager import graph

def get_related_topics(topic):
    if topic not in graph:
        return []

    return list(graph.neighbors(topic))

def recommend_next_topic(current_topic):
    related_topics = get_related_topics(current_topic)

    

    