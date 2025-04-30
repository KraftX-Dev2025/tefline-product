import os

def create_project_structure():
    # Define the directory structure
    directories = [
        'src/app',
        'src/app/resources',
        'src/app/ai-tools',
        'src/app/onboarding', 
        'src/app/api/chat',
        'src/components/ui',
        'src/components/layout',
        'src/components/resources',
        'src/components/ai-tools',
        'src/components/onboarding',
        'src/components/chat',
        'src/lib/hooks',
        'src/constants',
        'src/styles'
    ]

    # Files to create
    files = [
        # App directory files
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'src/app/resources/page.tsx',
        'src/app/ai-tools/page.tsx',
        'src/app/onboarding/page.tsx',
        'src/app/api/chat/route.ts',

        # Components UI
        'src/components/ui/button.tsx',
        'src/components/ui/card.tsx',
        'src/components/ui/input.tsx',

        # Layout components
        'src/components/layout/header.tsx',
        'src/components/layout/footer.tsx',
        'src/components/layout/hero-section.tsx',

        # Resource components
        'src/components/resources/resource-card.tsx',
        'src/components/resources/drive-link.tsx',

        # AI Tools components
        'src/components/ai-tools/ai-tool-card.tsx',
        'src/components/ai-tools/prompt-examples.tsx',

        # Onboarding components
        'src/components/onboarding/onboarding-form.tsx',
        'src/components/onboarding/progress-bar.tsx',

        # Chat components
        'src/components/chat/chat-interface.tsx',
        'src/components/chat/chat-bubble.tsx',

        # Lib files
        'src/lib/utils.ts',
        'src/lib/hooks/use-chat.ts',
        'src/lib/types.ts',

        # Constants
        'src/constants/resources.ts',
        'src/constants/ai-tools.ts',
        'src/constants/chatbot-prompts.ts',

        # Styles
        'src/styles/globals.css'
    ]

    # Create directories
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"Created directory: {directory}")

    # Create empty files
    for file_path in files:
        # Ensure directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        # Create empty file
        open(file_path, 'a').close()
        print(f"Created file: {file_path}")

if __name__ == "__main__":
    create_project_structure()
    print("Project structure created successfully!")