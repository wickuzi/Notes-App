#!/usr/bin/env bash
# exit on error
set -o errexit

# Apply database migrations
python manage.py migrate

# Start Gunicorn with the configuration file
gunicorn backend.wsgi:application --config gunicorn_config.py
