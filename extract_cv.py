import pypdf

reader = pypdf.PdfReader("public/assets/CV_Ricardo_Delfin.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open("cv_text.txt", "w", encoding="utf-8") as f:
    f.write(text)

print("CV text successfully extracted! Length:", len(text))
