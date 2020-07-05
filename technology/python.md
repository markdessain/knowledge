# Python

## Snippets

### Camel case to underscores

```
import re 
def convert_name(name):
    s1 = re.sub("(.)([A-Z0-9][a-z]+)", r"\1_\2", name)
    return re.sub("([a-z])([A-Z0-9])", r"\1_\2", s1).lower().replace("__", "_")
    
```