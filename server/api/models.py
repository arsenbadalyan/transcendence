from django.db import models
from django.utils import timezone

class Analytics(models.Model):
    AnalyticsID = models.AutoField(primary_key=True)
    TotalMatches = models.IntegerField()
    WonMatches = models.IntegerField()
    Score = models.IntegerField()
    Rank = models.IntegerField()

    def __str__(self) -> str:
        return f"Analytics {self.AnalyticsID}"

class Users(models.Model):
    UserID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Surname = models.CharField(max_length=255)
    Username = models.CharField(max_length=255, unique=True)
    Email = models.EmailField(unique=True)
    Password = models.CharField(max_length=255)
    LastLogin = models.DateTimeField(auto_now=True)
    Gender = models.IntegerField()
    Analytics = models.OneToOneField(Analytics, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) -> str:
        return self.Username

class Tokens(models.Model):
    User = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=False)
    refreshToken = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"Token for user {self.User.Username}"

class Messages(models.Model):
    MessageID = models.AutoField(primary_key=True)
    SenderID = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='sent_messages')
    Timestamp = models.DateTimeField(default=timezone.now)
    Content = models.TextField()
    Status = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"Message {self.MessageID} from {self.SenderID.Username}"

class Tournaments(models.Model):
    TournamentsID = models.AutoField(primary_key=True)
    StartDate = models.DateTimeField()
    EndDate = models.DateTimeField()
    Status = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"Tournament {self.TournamentsID}"

class Matches(models.Model):
    MatchID = models.AutoField(primary_key=True)
    MatchDate = models.DateTimeField()
    Player1 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player1_matches')
    Player2 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player2_matches')
    Player3 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player3_matches', null=True, blank=True)
    Player4 = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='player4_matches', null=True, blank=True)
    WinnerID = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='won_matches', null=True, blank=True)
    TournamentID = models.ForeignKey(Tournaments, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Match {self.MatchID}"

class TournamentParticipants(models.Model):
    ParticipantsID = models.AutoField(primary_key=True)
    TournamentsID = models.ForeignKey(Tournaments, on_delete=models.CASCADE)
    PlayerID = models.ForeignKey(Users, on_delete=models.CASCADE)
    Score = models.IntegerField()
    Rank = models.IntegerField()

    class Meta:
        unique_together = ('TournamentsID', 'PlayerID')
        indexes = [
            models.Index(fields=['TournamentsID']),
            models.Index(fields=['PlayerID']),
        ]

    def __str__(self):
        return f"Participant {self.PlayerID} in Tournament {self.TournamentsID}"
