import sys
import os

# Mockup python file
def generate_audio(book_id, user_id):
    audio_path = f'/path/to/generated/audio/{book_id}_{user_id}.mp3'
    with open(audio_path, 'w') as f:
        f.write('This is a dummy audio file.')
    return audio_path

if __name__ == '__main__':
    book_id = sys.argv[1]
    user_id = sys.argv[2]
    audio_path = generate_audio(book_id, user_id)
    print(audio_path)
