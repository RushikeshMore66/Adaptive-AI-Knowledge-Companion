import networkx as nx

graph = nx.Graph()

def add_node(node_name):
    graph.add_node(node_name)

def add_relationships(source,target):
    graph.add_edge(source,target)

    