from source import db


class User(db.Model):  # type: ignore
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text(), unique=False, nullable=False)
    email = db.Column(db.Text(), unique=False, nullable=False)
    secret = db.Column(db.Text(), unique=False, nullable=False)
    salt = db.Column(db.Text(), unique=False, nullable=False)

    def __repr__(self):
        return f"Id = {self.id}"


class MusicRooms(db.Model):  # type: ignore
    __tablename__ = "music_rooms"

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.Text(), unique=False, nullable=False)
    music_room_name = db.Column(db.Text(), unique=False, nullable=False)
    username = db.Column(db.Text(), unique=False, nullable=False)

    def __repr__(self):
        return f"Id = {self.id}"


class MusicContent(db.Model):  # type: ignore
    __tablename__ = "music_content"

    id = db.Column(db.Integer, primary_key=True)
    music_room_uuid = db.Column(db.Text(), unique=False, nullable=False)
    song_name = db.Column(db.Text(), unique=False, nullable=False)
    content_url = db.Column(db.Text(), unique=False, nullable=False)
    mp3_encoded = db.Column(db.Text(), unique=False, nullable=False)

    def __repr__(self):
        return f"Id = {self.id}"
