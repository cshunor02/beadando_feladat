import FadeIn from 'react-fade-in';

export function MainPage() {
    return (
        <FadeIn>
            <div className="smallBox">
                <h1>Surveys - Home</h1>
                <hr />
                <p>On the following page, users can create multi-step questionnaires. The created surveys can be reviewed in a table where they all can be modified, deleted, and shared via a link. The surveys can be filled out via this link. The answers to the questionnaires can be viewed on a separate interface</p>
                <p>To continue, login to your account, or register!</p>
            </div>
        </FadeIn>
    );
  }
  