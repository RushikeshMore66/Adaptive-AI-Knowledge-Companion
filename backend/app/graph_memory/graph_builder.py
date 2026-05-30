from graph_manager import add_node, add_relationships

def build_learning_graph(user_id,topic):
    user_node = f"user:{user_id}"

    add_node(topic)
    add_relationships(user_node,topic)
    

