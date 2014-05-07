      /**
       * @jsx React.DOM
       */
      // The above declaration must remain intact at the top of the script.
      // Your code here

      var data = [
        {author: "Pete Hunt", text: "This is one comment"},
        {author: "Jordan Walke", text: "This is *another* comment"},
        {author: "Jordan Walke2", text: "This is another _comment_"}
      ]; 

      var converter = new Showdown.converter();
      var Comment = React.createClass({
        render: function(){
          var rawMarkup = converter.makeHtml(this.props.children.toString());
          return (
            <div className="Comment">
              <h2 className="commentAuthor">
                {this.props.author}
              </h2>
              <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
          );
        }
      });

      var CommentList = React.createClass({
        render: function(){
          var commentNodes = this.props.data.map(function(comment){
            return <Comment author={comment.author}>{comment.text}</Comment>
          });
          return (
            <div className="commentList">
              {commentNodes}
            </div>
          );
        }
      });

      var CommentForm = React.createClass({
        render: function(){
          return (
            <div className="CommentForm">
              CommentForm here.
            </div>
          );
        }
      });

      var CommentBox = React.createClass({
        getInitialState: function(){
          return {data: []};
        },
        loadCommentsFromServer: function(){
          $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data){
              this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
        },
        componentWillMount: function(){
          this.loadCommentsFromServer();
          setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        },
        render: function(){
          return (
              <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <p>&nbsp;</p>
                <CommentForm />
              </div>
            );
        }
      });

      React.renderComponent(
        <CommentBox url="comments.json" pollInterval={2000} />,
        document.getElementById('content')
      );