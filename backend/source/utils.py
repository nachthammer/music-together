from typing import Optional, List, Tuple

from source.db_helpers import db_get_user_secret_and_salt_if_exists, db_get_user_by_username, db_get_user_by_email, \
    db_create_user_row, db_music_room_present_for_user, db_insert_music_room_for_user, db_get_music_rooms_from_user, \
    db_get_content_from_room, db_add_content_to_room, db_song_url_already_exists
from source.secrets import get_encrypted_user_secret_from_secret_params, _sha512, \
    get_encrypted_user_secret_from_clean_params
from source.youtube_api import url_to_mp3_encoded


def verify_user_data(username: str, password: str) -> bool:
    result = db_get_user_secret_and_salt_if_exists(username)
    if result is not None:
        stored_password_hash, salt = result
        password_hash_given = get_encrypted_user_secret_from_clean_params(clean_password=password, salt=salt)
        if password_hash_given == stored_password_hash:
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


def music_url_already_in_the_room(song_url: str, music_room_uuid: str) -> bool:
    return db_song_url_already_exists(song_url=song_url, music_room_uuid=music_room_uuid)


def get_content_from_room(music_room_uuid: str) -> Optional[List[Tuple[str, str]]]:
    return db_get_content_from_room(uuid=music_room_uuid)


def insert_song_into_music_room(song_name: str, song_url: str, music_room_uuid: str):
    db_add_content_to_room(song_name=song_name, song_url=song_url, music_room_uuid=music_room_uuid, mp3_encoded=url_to_mp3_encoded(song_url))


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
