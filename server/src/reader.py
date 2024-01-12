from gtts import gTTS
from io import BytesIO
import base64

def text_to_speech(text, language='es-es'):
    speech = gTTS(text=text, lang=language, slow=False)
    mp3_fp = BytesIO()
    speech.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    mp3_base64 = base64.b64encode(mp3_fp.read()).decode('utf-8')
    return mp3_base64
