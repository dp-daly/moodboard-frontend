const Page = ({ page, total, updatePage }) => {

    return (
    <div className="page">
    <button disabled={page === 1} onClick={() => updatePage('previous')}>Previous</button>
    Page {page} of {total}
    <button onClick={() => updatePage('next')}>Next</button>
    </div>
    )
}

export default Page;