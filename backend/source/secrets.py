import uuid
from hashlib import sha512
from typing import Tuple


def _sha512(message: str) -> str:
    return sha512(message.encode("utf-8")).hexdigest()


def generate_random_guid() -> str:
    return str(uuid.uuid4()).replace("-", "")


def get_encrypted_user_secret_from_clean_params(clean_password: str, salt: str) -> str:
    return _sha512(_sha512(clean_password) + salt)


def get_encrypted_user_secret_from_secret_params(password_hash: str, salt: str) -> str:
    return _sha512(password_hash + salt)



def create_encrypted_user_secret_and_params(password: str) -> Tuple[str, str]:
    salt = _sha512(generate_random_guid())
    password_hash = _sha512(password)

    return _sha512(password_hash + salt), salt
