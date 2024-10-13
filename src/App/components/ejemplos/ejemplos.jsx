import './styles.css'

const planet = 'Earth';
const MyComp = () => <div>Hello {planet}!</div>


const imgSrc = 'https://...';
const MyComp2 = () => <img src={imgSrc} />


const imagesProps = {
    src: 'https...',
    alt: 'My image',
};
const MyComp3 = () => <img {...imagesProps} />


const MyComp4 = () => //<React.Fragment> Hello world </React.Fragment>
<>
    <p>Hello world</p>
    <p>Hello world2</p>
</>
