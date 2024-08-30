from api.models import Users

def UserDTO(user: Users) -> dict:
    return {
        "user_id": user.user_id,
        "name": user.name,
        "surname": user.surname,
        "username": user.username,
        "email": user.email,
        "gender": user.gender,
    }
