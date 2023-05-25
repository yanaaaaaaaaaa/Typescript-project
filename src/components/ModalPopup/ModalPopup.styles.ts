import styled from 'styled-components'

const ModalContainer = styled.div`
  backgroung-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const DesktopModalContainer = styled(ModalContainer)`
  border-radius: 7px;
  box-shadow: 0 0 32px rgba(0,0,0,0.5);
  padding: 40px;
  width: 450px;
  font-size: 26px;
`

