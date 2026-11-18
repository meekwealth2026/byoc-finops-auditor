use keyring::Entry;

pub fn save_credential(service_name: &str, account: &str, secret: &str) -> Result<(), String> {
    let entry = Entry::new(service_name, account).map_err(|e| e.to_string())?;
    entry.set_password(secret).map_err(|e| e.to_string())?;
    Ok(())
}

pub fn get_credential(service_name: &str, account: &str) -> Result<String, String> {
    let entry = Entry::new(service_name, account).map_err(|e| e.to_string())?;
    entry.get_password().map_err(|e| e.to_string())
}
