# Python

## Snippets

### Camel case to underscores

```python
import re 
def convert_name(name):
    s1 = re.sub("(.)([A-Z0-9][a-z]+)", r"\1_\2", name)
    return re.sub("([a-z])([A-Z0-9])", r"\1_\2", s1).lower().replace("__", "_")
    
```

## Juputer Lab

To install qgrid in Jupyter lab we need to do:

```
poetry add qgrid=="XXXXX"
poetry run jupyter labextension install @jupyter-widgets/jupyterlab-manager
poetry run jupyter labextension install qgrid2
```

The following has to be added to the Jupyter startup files and will allow us to display a Spark Dataframe using qgrid.

```python
import qgrid

def display(df, limit=20):
    return qgrid.show_grid(df.limit(limit).toPandas(), grid_options={'forceFitColumns': False})
```

Running Jupyter Lab

```
poetry run jupyter lab
```

