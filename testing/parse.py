import pandas as pd
import json

xlsx_file = '/Users/bramschork/Documents/cocktails/src/data/donations.xlsx'
json_file = '/Users/bramschork/Documents/cocktails/src/data/data.json'

# Read the Excel file into a pandas DataFrame
df = pd.read_excel(xlsx_file)

# Convert the DataFrame to a JSON object
json_data = df.to_json(orient='records')

# Write the JSON data to a file
with open(json_file, 'w') as file:
    file.write(json_data)

print(f"Data has been successfully parsed and saved as {json_file}.")
