from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password

class Analytics(models.Model):
    analytics_id = models.AutoField(primary_key=True, db_column='analytics_id')
    total_matches = models.IntegerField(default=0, db_column='total_matches')
    won_matches = models.IntegerField(default=0, db_column='won_matches')
    score = models.IntegerField(default=0, db_column='score')
    rank = models.IntegerField(default=0, db_column='rank')

    def __str__(self) -> str:
        return f"Analytics {self.analytics_id}"

class Users(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female')
    ]

    user_id = models.AutoField(primary_key=True, db_column='user_id')
    name = models.CharField(max_length=255, db_column='name')
    surname = models.CharField(max_length=255, db_column='surname')
    username = models.CharField(max_length=255, unique=True, db_column='username')
    email = models.EmailField(unique=True, db_column='email')
    password = models.CharField(max_length=255, db_column='password')
    last_login = models.DateTimeField(auto_now=True, db_column='last_login')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, db_column='gender')
    analytics = models.OneToOneField('Analytics', on_delete=models.CASCADE, null=True, blank=True, db_column='analytics')

    def save(self, *args, **kwargs) -> None:
        if self.password and not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def check_password(self, raw_password) -> bool:
        return check_password(raw_password, self.password)

    def __str__(self) -> str:
        return self.username

class Tokens(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE, db_column='user')
    refresh_token = models.CharField(max_length=255, db_column='refresh_token')

    def __str__(self) -> str:
        return f"Token for user {self.user.username}"

class Messages(models.Model):
    STATUS_CHOICES = [
        ('sent', 'Sent'),
        ('delivered', 'Delivered'),
        ('read', 'Read'),
    ]

    message_id = models.AutoField(primary_key=True, db_column='message_id')
    sender_id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='sent_messages', db_column='sender_id')
    timestamp = models.DateTimeField(default=timezone.now, db_column='timestamp')
    content = models.TextField(db_column='content')
    status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='sent', db_column='status')

    def __str__(self) -> str:
        return f"Message {self.message_id} from {self.sender_id.username}"

class Tournaments(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
    ]
    tournaments_id = models.AutoField(primary_key=True, db_column='tournaments_id')
    start_date = models.DateTimeField(db_column='start_date')
    end_date = models.DateTimeField(db_column='end_date')
    status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='upcoming', db_column='status')

    def __str__(self) -> str:
        return f"Tournament {self.tournaments_id}"

class Matches(models.Model):
    match_id = models.AutoField(primary_key=True, db_column='match_id')
    match_date = models.DateTimeField(db_column='match_date')
    player1 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player1_matches', db_column='player1')
    player2 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player2_matches', db_column='player2')
    player3 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player3_matches', null=True, blank=True, db_column='player3')
    player4 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player4_matches', null=True, blank=True, db_column='player4')
    winner_id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='won_matches', null=True, blank=True, db_column='winner_id')
    tournament_id = models.ForeignKey(Tournaments, on_delete=models.SET_NULL, null=True, blank=True, db_column='tournament_id')

    def __str__(self):
        return f"Match {self.match_id}"

class TournamentParticipants(models.Model):
    participants_id = models.AutoField(primary_key=True, db_column='participants_id')
    tournaments_id = models.ForeignKey(Tournaments, on_delete=models.CASCADE, db_column='tournaments_id')
    player_id = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='player_id')
    score = models.IntegerField(default=0, db_column='score')
    rank = models.IntegerField(default=0, db_column='rank')

    class Meta:
        unique_together = ('tournaments_id', 'player_id')
        indexes = [
            models.Index(fields=['tournaments_id']),
            models.Index(fields=['player_id']),
        ]

    def __str__(self):
        return f"Participant {self.player_id} in Tournament {self.tournaments_id}"
