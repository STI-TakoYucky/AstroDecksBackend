import sys
import json
from docling import Docling

file_path = sys.argv[1]

docling = Docling()
parsed = docling.parse(file_path)
print(json.dumps(parsed))
