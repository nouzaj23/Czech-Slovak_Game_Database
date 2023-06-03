export const AddCommentForm = () => {

    return (
        <div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1em', maxWidth: '500px', margin: 'auto', backgroundColor: '#f0f0f0', padding: '1em', borderRadius: '0.5em' }}>
                <div>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                        Komentář:
                        <textarea name="comment" style={{ padding: '0.5em', borderRadius: '0.25em', border: '1px solid #ccc', minHeight: '100px' }}></textarea>
                    </label>
                </div>
                <div>
                    <input type="submit" value="Odeslat" style={{ padding: '0.5em', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '0.25em' }} />
                </div>
            </form>
        </div>
    );
}