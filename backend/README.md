This is the backend

## Dependencies

Python >= 3.10

## Development

### Create virtual environment

```shell
python -m venv venv
```


```shell
.\venv\Scripts\activate.ps1
```

```
pip install -r requirements.txt
```

Then you have to set the environment varibale FLASK_APP=main.py and FLASK_RUN_PORT=6001.

Then just run 
````shell
flask run --host=0.0.0.0
```
