import base64
import binascii
import time
import uuid
from hashlib import sha512
from typing import Tuple, Optional

import cryptography  # type: ignore
from cryptography.fernet import Fernet  # type: ignore


def _sha512(message: str) -> str:
    return sha512(message.encode("utf-8")).hexdigest()


def generate_random_guid() -> str:
    return str(uuid.uuid4()).replace("-", "")


def get_encrypted_user_secret_from_secret_params(password: str, salt: str) -> str:
    return _sha512(password + salt)


def create_encrypted_user_secret_and_params(password: str) -> Tuple[str, str]:
    salt = _sha512(generate_random_guid())
    password_hash = _sha512(password)

    return password_hash, salt
