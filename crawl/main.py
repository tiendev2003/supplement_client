import requests
from bs4 import BeautifulSoup

url = "https://gymex.wpbingosite.com/wp-json/wp/v2/posts"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    for post in data:
        title = post['title']['rendered']
        raw_content = post['content']['rendered']
        
        # Dùng BeautifulSoup để loại bỏ HTML
        soup = BeautifulSoup(raw_content, "html.parser")
        plain_text = soup.get_text()

        print(f"Title: {title}")
        print(f"Content: {plain_text}")
