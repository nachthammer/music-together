import json

from flask import request, jsonify
from sqlalchemy.exc import OperationalError  # type: ignore

from source.utils import verify_user_data, username_already_exists, email_already_exists, register_user, \
    music_room_name_for_username_already_exists, add_music_room_for_user, get_music_rooms_for_user, \
    music_url_already_in_the_room, insert_content_into_music_room, get_content_from_room
from source import app


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/api/login', methods=["POST"])
def login():
    request_data = json.loads(request.data.decode(encoding="utf-8"))
    print(request_data)
    if "username" not in request_data:
        return "You need to provide a value for the username key.", 400
    if "password" not in request_data:
        return "You need to provide a value for the password key.", 400
    if len(str(request_data["username"])) < 4:
        return "Username too short. Need at least 4 characters.", 400
    if len(str(request_data["password"])) < 8:
        return "Password too short. Need at least 8 characters.", 400
    if not verify_user_data(request_data["username"], request_data["password"]):
        return "Wrong username or password", 400
    return "correct user", 200


@app.route('/api/register', methods=["POST"])
def register():
    request_data = json.loads(request.data.decode(encoding="utf-8"))
    print(request_data)
    if "email" not in request_data:
        return "You need to provide a value for the email key.", 400
    if "username" not in request_data:
        return "You need to provide a value for the username key.", 400
    if "password" not in request_data:
        return "You need to provide a value for the secret key.", 400

    if len(str(request_data["username"])) < 4:
        return "Username too short. Need at least 4 characters.", 400
    if len(str(request_data["password"])) < 8:
        return "Password too short. Need at least 8 characters.", 400

    if username_already_exists(request_data["username"]):
        return "Username already exists", 400
    if email_already_exists(request_data["email"]):
        return "Email already exists", 400

    register_user(request_data["username"], request_data["email"], request_data["password"])

    return "registration completed", 200


@app.route('/api/get-music-rooms', methods=["POST"])
def get_music_rooms():
    request_data = json.loads(request.data.decode(encoding="utf-8"))
    print(request_data)
    if "username" not in request_data:
        return "You need to provide a value for the username key.", 400
    music_rooms = get_music_rooms_for_user(request_data["username"])

    music_rooms_json = json.dumps([{"uuid": uuid, "musicRoomName": username} for uuid, username in music_rooms])
    print(music_rooms_json)
    return music_rooms_json, 200


@app.route('/api/create-music-room', methods=["POST"])
def add_music_room():
    request_data = json.loads(request.data.decode(encoding="utf-8"))
    print(request_data)
    if "username" not in request_data:
        return "You need to provide a value for the username key.", 400
    if "musicRoomName" not in request_data:
        return "You need to provide a value for the music room name key.", 400

    if len(str(request_data["username"])) < 4:
        return "Non-valid username", 400
    if len(str(request_data["musicRoomName"])) < 1:
        return "Music room name cannot be empty", 400

    if music_room_name_for_username_already_exists(request_data["username"], request_data["musicRoomName"]):
        return "Music room name already exists", 400

    uuid = add_music_room_for_user(request_data["username"], request_data["musicRoomName"])

    return uuid, 200


@app.route('/api/add-content-to-room', methods=["POST"])
def add_content_to_room():
    request_data = json.loads(request.data.decode(encoding="utf-8"))
    print(request_data)
    if "username" not in request_data:
        return "You need to provide a value for the username key.", 400
    if "musicRoomName" not in request_data:
        return "You need to provide a value for the music room name key.", 400
    if "content" not in request_data:
        return "You need to provide a value for the content key.", 400

    if len(str(request_data["username"])) < 4:
        return "Non-valid username", 400
    if len(str(request_data["musicRoomName"])) < 1:
        return "Music room name cannot be empty", 400
    if len(str(request_data["content"])) < 1:
        return "Content name cannot be empty", 400

    if music_url_already_in_the_room(request_data["content"], request_data["musicRoomName"]):
        return "Music room name already exists", 400

    insert_content_into_music_room(request_data["content"], request_data["musicRoomName"])

    return "Song successfully inserted", 200


@app.route('/api/get-content-from-room', methods=["POST"])
def get_content_from_room():
    request_data = json.loads(request.data.decode(encoding="utf-8"))
    print(request_data)
    if "username" not in request_data:
        return "You need to provide a value for the username key.", 400
    if "musicRoomName" not in request_data:
        return "You need to provide a value for the music room name key.", 400

    if len(str(request_data["username"])) < 4:
        return "Non-valid username", 400
    if len(str(request_data["musicRoomName"])) < 1:
        return "Music room name cannot be empty", 400

    music_contents = get_content_from_room(request_data["musicRoomName"])

    return jsonify(music_contents), 200




@app.route("/api/health", methods=["GET", "POST"])
def health():
    return "Ok", 200


if __name__ == '__main__':
    app.run()
