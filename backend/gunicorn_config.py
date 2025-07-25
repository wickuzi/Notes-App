import multiprocessing

bind = "0.0.0.0:10000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "gunicorn.workers.gthread.ThreadWorker"
threads = 2 * multiprocessing.cpu_count() + 1
max_requests = 1000
max_requests_jitter = 50
log_level = "info"
