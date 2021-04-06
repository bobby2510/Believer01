import flask

app = flask.Flask(__name__,
            static_url_path='')
@app.route('/',methods=['GET',])
def home():
    return flask.render_template('start.html')

if __name__ == '__main__':
    app.run()