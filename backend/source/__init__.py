import os.path

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="static/build")

if app.static_folder is not None and not os.path.exists(app.static_folder):
    os.makedirs(app.static_folder)

base_dir = os.path.abspath(os.path.dirname(__file__))
database_uri = os.environ.get("DATABASE_URL", "").replace("postgres://", "postgresql://") or \
               "sqlite:///" + os.path.join(base_dir, "backend.db")
app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app, supports_credentials=True)

db = SQLAlchemy(app)

migrate = Migrate(app, db)

from source import routes, models  # noqa: F401, E402
