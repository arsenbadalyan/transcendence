from django import forms
from django.contrib.auth.hashers import make_password
from api.models import Users
from typing import Dict, Any

class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, min_length=8, max_length=128)
    confirmPassword = forms.CharField(widget=forms.PasswordInput, min_length=8, max_length=128)
    gender = forms.ChoiceField(choices=Users.GENDER_CHOICES)

    class Meta:
        model = Users
        fields = ['name', 'surname', 'username', 'email', 'password', 'confirmPassword', 'gender']

    def clean(self) -> Dict[str, Any]:
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirmPassword = cleaned_data.get('confirmPassword')

        if password and confirmPassword and password != confirmPassword:
            raise forms.ValidationError("Passwords do not match.")

        return cleaned_data

    def save(self, commit: bool = True) -> Users:
        user = super().save(commit=False)
        user.Password = make_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user

class LoginForm(forms.Form):
    username = forms.CharField(max_length=150, widget=forms.TextInput(attrs={'autofocus': True}))
    password = forms.CharField(widget=forms.PasswordInput)
