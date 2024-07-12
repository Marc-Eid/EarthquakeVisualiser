# EarthquakeVisualiser
Building a Full Stack JavaScript App with Elasticsearch

![image](https://github.com/user-attachments/assets/a02fa700-b2a7-4ea0-879b-1f63e77446c0)


### Getting the API Key
1. Authenticate with username & password.
2. Use the createApiKey() endpoint to receive id and api_key.
3. join id:api_key, then encode base_64.

### Create the earthquake index
```
PUT earthquakes
{
  "mappings": {
    "properties": {
      "@timestamp": {
        "type": "date"
      },
      "coordinates": {
        "type": "geo_point"
      },
      "depth": {
        "type": "float"
      },
      "mag": {
        "type": "float"
      },
      "place": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "sig": {
        "type": "short"
      },
      "type": {
        "type": "keyword"
      },
      "url": {
        "enabled": false
      }
    }
  }
}
```
