import { Container, Spinner } from 'react-bootstrap'

export default function LoaderComponent() {
    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" role="status" />
            </div>
        </Container>
    )
}
