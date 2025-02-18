import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, 
	CardTitle, Breadcrumb, BreadcrumbItem, Button, 
	Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
	constructor(props){
		super(props);
		this.state={
			isModalOpen: false
		}
	}

	toggleModal = ()=> {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit = (values) => {	
		this.toggleModal();
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	render(){
		return(
			<div>
			<Button outline onClick={this.toggleModal}>
			<span className="fa fa-pencil"></span>
				{' '}Submit Comment
			</Button>
			<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
				<ModalBody>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
					<Row className='form-group'>
						<Label htmlFor="rating" md={12}>Rating</Label>
						<Col md={12}>
                            <Control.select model=".rating" name="rating"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
					</Row>
					<Row className='form-group'>
                        <Label htmlFor="author" md={12}>Your Name</Label>
                        <Col md={12}>
                            <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    minLength: minLength(3), maxLength: maxLength(15)
                                }} />
                         	<Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{                                
                                    minLength: 'Must be atleast 3 characters',
                                    maxLength: 'Must be less than 16 characters'
                                }}
                             />
                        </Col>
                    </Row>
		            <Row className='form-group'>
	                    <Label htmlFor="comment" md={12}>Comment</Label>	            
	                    <Col>
	                        <Control.textarea model=".comment" id="comment" name="comment"
	                            rows="6"
	                            className="form-control" />                       
	                    </Col>
	                </Row>
	                <Button type="submit" value="submit" color="primary">Submit</Button>
		            </LocalForm>
		        </ModalBody>
			</Modal>
			</div>
		);
	};
}

function RenderDish({dish}){
	if(dish==null){
		return(" ");
	}
	else
	{
		return(
			<FadeTransform in 
				transformProps={{
					exitTransform: 'scale(0.5) translateY(-50%)'
				}}>
				<Card>
	                <CardImg top src={baseUrl+dish.image} alt={dish.name} />
	                <CardBody>
	                  <CardTitle>{dish.name}</CardTitle>
	                  <CardText>{dish.description}</CardText>
	                </CardBody>
	            </Card>
            </FadeTransform>
		);
	}
}


function RenderComments({comments, postComment, dishId})
{
	if(comments==null)
	{
		return(<div></div>);
	}
	else
	{
		let enterComments=comments.map((individual)=> {
			return(
					<Fade in>
						<li key={individual.id}>
							<div>{individual.comment}</div><br/>
							<div>--{individual.author},{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(individual.date)))}</div><br/>
						</li>
					</Fade>
				);
			});
		return(
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
					<Stagger in>
						{enterComments}
					</Stagger>
				</ul>
				<CommentForm dishId={dishId} postComment={postComment} /> <br />
			</div>
		);
	}
}

function Detail({dish, comments, postComment, isLoading, errMess}){

	if(isLoading){
		return(
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	}
	if(errMess){
		return(
			<div className="container">
				<div className="row">
					<h4>{errMess}</h4>
				</div>
			</div>
		);
	}
	let comment;
	if(dish!=null)
	{
		comment=comments;
	}
	else
	{
		comment=null;
	}
	return(
		<div className="container">
			<div className="row">
	            <Breadcrumb>
	              <BreadcrumbItem>
	                <Link to='/menu'>Menu</Link>
	              </BreadcrumbItem>
	              <BreadcrumbItem active>
	                {dish.name}
	              </BreadcrumbItem>
	            </Breadcrumb>
	            <div className="col-12">
	              <h3>{dish.name}</h3>
	              <hr />      
	            </div>
	        </div>
			<div className="row">
				<div  className="col-12 col-md-5 m-1">
					<RenderDish dish={dish} />
				</div>
				<div  className="col-12 col-md-5 m-1">
					<RenderComments comments={comment}
					postComment={postComment}
					dishId={dish.id} />
				</div>
			</div>
		</div>
	)
}



export default Detail;

