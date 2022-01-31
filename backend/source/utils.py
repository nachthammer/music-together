from typing import Optional, List, Tuple

from source.db_helpers import db_get_user_secret_and_salt_if_exists, db_get_user_by_username, db_get_user_by_email, \
    db_create_user_row, db_music_room_present_for_user, db_insert_music_room_for_user, db_get_music_rooms_from_user, \
    db_get_content_from_room, db_add_content_to_room
from source.secrets import get_encrypted_user_secret_from_secret_params, _sha512
from source.youtube_api import url_to_mp3_encoded


def verify_user_data(username: str, password: str) -> bool:
    if db_get_user_secret_and_salt_if_exists(username) is not None:
        stored_password_hash, salt = db_get_user_secret_and_salt_if_exists(username)
        if get_encrypted_user_secret_from_secret_params(password=_sha512(password), salt=salt) == get_encrypted_user_secret_from_secret_params(password=stored_password_hash, salt=salt):
            return True

    return False


def register_user(username: str, email: str, password: str):
    db_create_user_row(username, email, password)


def music_room_name_for_username_already_exists(username: str, music_room_name: str) -> bool:
    if db_music_room_present_for_user(username=username, music_room_name=music_room_name):
        return True
    return False


def add_music_room_for_user(username: str, music_room_name: str) -> Optional[str]:
    if not db_music_room_present_for_user(username=username, music_room_name=music_room_name):
        uuid = db_insert_music_room_for_user(username=username, music_room_name=music_room_name)
        return uuid
    return None


def get_music_rooms_for_user(username: str) -> List[Tuple[str, str]]:
    music_rooms = db_get_music_rooms_from_user(username)
    if music_rooms is None:
        return []
    return music_rooms


def music_url_already_in_the_room(content: str, music_room_name: str) -> bool:
    if content in db_get_content_from_room(music_room_name):
        return True
    return False


def get_content_from_room(music_room_name: str) -> Optional[List[str]]:
    return db_get_content_from_room(music_room_name=music_room_name)


def insert_content_into_music_room(content: str, music_room_name: str):
    db_add_content_to_room(content=content, music_room_name=music_room_name, song_name=content, mp3_encoded=url_to_mp3_encoded(content))


def username_already_exists(username: str) -> bool:
    user = db_get_user_by_username(username)
    if user is not None:
        return True
    return False


def email_already_exists(username: str) -> bool:
    user = db_get_user_by_email(username)
    if user is not None:
        return True
    return False

