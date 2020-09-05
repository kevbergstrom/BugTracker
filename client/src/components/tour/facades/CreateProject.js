import React from 'react'

const technologies=['C++','Java','SQL']

const CreateProject = props => {
    return(
            <div className="container-fluid">
                <div className="container-fluid  contentColor shadow rounded border">
                    <h4>Create Project</h4>
                    <hr/>
                    <form onSubmit={e=>e.preventDefault()}>
                        <div className="form-group">
                            <label>Project Name</label>
                            <input name="title" type="text" className="form-control inputColor" placeholder="Name"/>
                        </div>
                        <div className="form-group">
                            <label>Project Link</label>
                            <input name="link" type="text" className="form-control inputColor" placeholder="github.com"/>
                        </div>
                        <div className="form-check">
                            <input id="privateButton" name="private" type="checkbox" className="form-check-input"/>
                            <label className="form-check-label">Private</label>
                        </div>
                        <p></p>
                        <div className="form-group">
                            <label>Technologies</label>
                            <div className="form-inline">
                                <input type="text" className="form-control inputColor"/>
                                &nbsp;
                                <button className="btn btn-primary">Add</button>
                            </div>
                            {technologies.map((t, i) => 
                                <a href="#!" key={i} className="badge badge-primary text-white">{t}</a>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Project Description</label>
                            <textarea name="desc" className="form-control inputColor" rows="3"></textarea>
                        </div>
                        <a href="#!" type="submit" className="btn btn-primary text-white">Create Project</a>
                    </form>
                </div>
            </div>
    )
}

export default CreateProject