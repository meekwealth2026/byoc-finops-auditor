#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod keychain;
mod db;
mod aws_client;
mod ai_client;
mod auditor;
mod llm_auditor;

#[tauri::command]
fn save_credential_cmd(service_name: String, account: String, secret: String) -> Result<(), String> {
    keychain::save_credential(&service_name, &account, &secret)
}

#[tauri::command]
async fn run_local_finops_audit() -> Result<auditor::AuditSummary, String> {
    auditor::execute_full_local_audit().await
}

#[tauri::command]
fn run_shadow_ai_audit_cmd(records: Vec<llm_auditor::LlmApiCallRecord>) -> Result<Vec<llm_auditor::LlmAuditFinding>, String> {
    Ok(llm_auditor::analyze_shadow_ai_usage(records))
}

#[tauri::command]
fn run_deep_infrastructure_audit_cmd() -> Result<Vec<auditor::AuditFinding>, String> {
    Ok(auditor::scan_deep_infrastructure_waste())
}

fn main() {
    db::init_local_db().expect("Failed to initialize local SQLite database");

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            save_credential_cmd,
            run_local_finops_audit,
            run_shadow_ai_audit_cmd,
            run_deep_infrastructure_audit_cmd
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}