import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  FaSearch,
  FaComment,
  FaPlus,
  FaThumbtack,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaSave,
  FaFileCsv,
  FaArrowUp,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

function App() {
  const getInitialBots = () => {
    return [
        {
          id: 1,
          name: 'Customer Support Bot',
          tags: ['support', 'inquiries', 'helpdesk', 'customers'],
          links: [
            { url: 'https://example.com/support-docs.pdf', version: '1.2', lastUpdated: '2023-07-20', status: 'success' },
            { url: 'https://example.com/faq.txt', version: '2.0', lastUpdated: '2023-07-25', status: 'pending' },
          ],
          systemPrompt: 'You are a helpful customer support assistant. You have been trained on the following documents: [links]. Please answer questions based on the information in these documents.',
        },
        {
          id: 2,
          name: 'Sales Inquiry Bot',
          tags: ['sales', 'pricing', 'products', 'quotes', 'orders'],
          links: [
            { url: 'https://example.com/product-catalog.pdf', version: '3.1', lastUpdated: '2023-07-15', status: 'success' },
            { url: 'https://example.com/pricing-sheet.xlsx', version: '1.8', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a sales assistant providing information about our products and pricing. You are familiar with the following documents: [links]. Please provide accurate quotes and answer sales-related questions.',
        },
        {
          id: 3,
          name: 'HR Policy Bot',
          tags: ['hr', 'policy', 'benefits', 'onboarding', 'employees', 'handbook'],
          links: [
            { url: 'https://example.com/employee-handbook.pdf', version: '4.0', lastUpdated: '2023-07-10', status: 'success' },
            { url: 'https://example.com/benefits-guide.docx', version: '1.5', lastUpdated: '2023-07-22', status: 'failed' },
            { url: 'https://example.com/company-policies.txt', version: '2.2', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are an HR assistant providing information about company policies, benefits, and onboarding procedures. You have access to the following documents: [links]. Please answer questions based on these resources.',
        },
        {
          id: 4,
          name: 'Technical Support Bot',
          tags: ['technical', 'support', 'troubleshooting', 'issues', 'helpdesk', 'technical documents'],
          links: [
            { url: 'https://example.com/technical-docs.pdf', version: '1.0', lastUpdated: '2023-07-18', status: 'success' },
            { url: 'https://example.com/troubleshooting.txt', version: '1.2', lastUpdated: '2023-07-25', status: 'success' },
          ],
          systemPrompt: 'You are a technical support assistant. You are knowledgeable about our products and have access to technical documents. Please assist users with troubleshooting and resolving technical issues.',
        },
        {
          id: 5,
          name: 'Marketing Bot',
          tags: ['marketing', 'promotions', 'campaigns', 'social media', 'advertising'],
          links: [
            { url: 'https://example.com/marketing-materials.zip', version: '2.5', lastUpdated: '2023-07-26', status: 'pending' },
            { url: 'https://example.com/social-media-guidelines.pdf', version: '1.1', lastUpdated: '2023-07-21', status: 'success' },
          ],
          systemPrompt: 'You are a marketing assistant. You are familiar with our marketing campaigns, promotions, and social media guidelines. Please provide information about our marketing efforts.',
        },
        {
          id: 6,
          name: 'Financial Bot',
          tags: ['finance', 'accounting', 'budget', 'reports', 'expenses'],
          links: [
            { url: 'https://example.com/financial-reports.pdf', version: '4.2', lastUpdated: '2023-07-29', status: 'success' },
            { url: 'https://example.com/budget-guidelines.docx', version: '1.3', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are a financial assistant. You have access to financial reports and budget guidelines. Please assist with questions related to finance and accounting.',
        },
        {
          id: 7,
          name: 'Legal Bot',
          tags: ['legal', 'compliance', 'contracts', 'agreements', 'regulations'],
          links: [
            { url: 'https://example.com/legal-docs.pdf', version: '3.0', lastUpdated: '2023-07-23', status: 'success' },
            { url: 'https://example.com/compliance-regulations.txt', version: '1.9', lastUpdated: '2023-07-28', status: 'failed' },
          ],
          systemPrompt: 'You are a legal assistant. You are knowledgeable about legal documents, compliance, and regulations. Please provide information based on legal resources.',
        },
        {
          id: 8,
          name: 'Operations Bot',
          tags: ['operations', 'logistics', 'supply chain', 'inventory', 'processes'],
          links: [
            { url: 'https://example.com/operations-manual.pdf', version: '2.1', lastUpdated: '2023-07-20', status: 'success' },
            { url: 'https://example.com/inventory-report.xlsx', version: '1.6', lastUpdated: '2023-07-26', status: 'success' },
          ],
          systemPrompt: 'You are an operations assistant. You are familiar with our operations manual and inventory reports. Please assist with questions related to logistics and supply chain processes.',
        },
        {
          id: 9,
          name: 'Product Development Bot',
          tags: ['product', 'development', 'innovation', 'design', 'features', 'roadmap'],
          links: [
            { url: 'https://example.com/product-roadmap.pdf', version: '5.0', lastUpdated: '2023-07-25', status: 'success' },
            { url: 'https://example.com/design-specs.docx', version: '2.4', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are a product development assistant. You have access to the product roadmap and design specifications. Please provide information about product features and development plans.',
        },
        {
          id: 10,
          name: 'IT Support Bot',
          tags: ['it', 'support', 'network', 'security', 'systems', 'infrastructure', 'helpdesk'],
          links: [
            { url: 'https://example.com/it-security-policy.pdf', version: '1.7', lastUpdated: '2023-07-22', status: 'success' },
            { url: 'https://example.com/network-diagram.png', version: '1.1', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are an IT support assistant. You are knowledgeable about IT security policies and network infrastructure. Please assist with questions related to IT systems and security.',
        },
        {
          id: 11,
          name: 'Quality Assurance Bot',
          tags: ['qa', 'testing', 'quality', 'standards'],
          links: [
            { url: 'https://example.com/qa-guidelines.pdf', version: '2.0', lastUpdated: '2023-07-24', status: 'success' },
            { url: 'https://example.com/testing-procedures.docx', version: '1.3', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a QA assistant. Help with testing procedures and quality standards.',
        },
        {
          id: 12,
          name: 'Project Management Bot',
          tags: ['project', 'management', 'planning', 'agile', 'scrum'],
          links: [
            { url: 'https://example.com/pm-handbook.pdf', version: '3.0', lastUpdated: '2023-07-25', status: 'success' },
          ],
          systemPrompt: 'You are a project management assistant. Help with project planning and agile methodologies.',
        },
        {
          id: 13,
          name: 'Data Analytics Bot',
          tags: ['data', 'analytics', 'reporting', 'metrics'],
          links: [
            { url: 'https://example.com/analytics-guide.pdf', version: '1.5', lastUpdated: '2023-07-26', status: 'success' },
          ],
          systemPrompt: 'You are a data analytics assistant. Help with data interpretation and reporting.',
        },
        {
          id: 14,
          name: 'Compliance Bot',
          tags: ['compliance', 'regulations', 'audit', 'standards'],
          links: [
            { url: 'https://example.com/compliance-docs.pdf', version: '2.1', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are a compliance assistant. Help with regulatory requirements and audits.',
        },
        {
          id: 15,
          name: 'Training Bot',
          tags: ['training', 'learning', 'development', 'education'],
          links: [
            { url: 'https://example.com/training-materials.pdf', version: '1.8', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a training assistant. Help with learning and development programs.',
        },
        {
          id: 16,
          name: 'Facilities Bot',
          tags: ['facilities', 'maintenance', 'building', 'equipment'],
          links: [
            { url: 'https://example.com/facilities-manual.pdf', version: '1.2', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are a facilities assistant. Help with building maintenance and equipment.',
        },
        {
          id: 17,
          name: 'Research Bot',
          tags: ['research', 'development', 'innovation', 'studies'],
          links: [
            { url: 'https://example.com/research-papers.pdf', version: '2.4', lastUpdated: '2023-07-30', status: 'success' },
          ],
          systemPrompt: 'You are a research assistant. Help with research and development projects.',
        },
        {
          id: 18,
          name: 'Security Bot',
          tags: ['security', 'safety', 'protection', 'protocols'],
          links: [
            { url: 'https://example.com/security-protocols.pdf', version: '3.2', lastUpdated: '2023-07-31', status: 'success' },
          ],
          systemPrompt: 'You are a security assistant. Help with safety and security procedures.',
        },
        {
          id: 19,
          name: 'Supply Chain Bot',
          tags: ['supply', 'chain', 'logistics', 'inventory'],
          links: [
            { url: 'https://example.com/supply-chain-docs.pdf', version: '1.6', lastUpdated: '2023-08-01', status: 'success' },
          ],
          systemPrompt: 'You are a supply chain assistant. Help with logistics and inventory management.',
        },
        {
          id: 20,
          name: 'Risk Management Bot',
          tags: ['risk', 'management', 'assessment', 'mitigation'],
          links: [
            { url: 'https://example.com/risk-management.pdf', version: '2.3', lastUpdated: '2023-08-02', status: 'success' },
          ],
          systemPrompt: 'You are a risk management assistant. Help with risk assessment and mitigation strategies.',
        },
        {
          id: 21,
          name: 'Change Management Bot',
          tags: ['change', 'management', 'transition', 'transformation'],
          links: [
            { url: 'https://example.com/change-management.pdf', version: '1.4', lastUpdated: '2023-08-03', status: 'success' },
          ],
          systemPrompt: 'You are a change management assistant. Help with organizational transitions.',
        },
        {
          id: 22,
          name: 'Innovation Bot',
          tags: ['innovation', 'ideas', 'creativity', 'development'],
          links: [
            { url: 'https://example.com/innovation-guide.pdf', version: '1.9', lastUpdated: '2023-08-04', status: 'success' },
          ],
          systemPrompt: 'You are an innovation assistant. Help with creative problem-solving and new ideas.',
        },
        {
          id: 23,
          name: 'Documentation Bot',
          tags: ['documentation', 'writing', 'procedures', 'manuals'],
          links: [
            { url: 'https://example.com/documentation-guide.pdf', version: '2.2', lastUpdated: '2023-08-05', status: 'success' },
          ],
          systemPrompt: 'You are a documentation assistant. Help with writing and maintaining documentation.',
        },
        {
          id: 24,
          name: 'Process Improvement Bot',
          tags: ['process', 'improvement', 'optimization', 'efficiency'],
          links: [
            { url: 'https://example.com/process-improvement.pdf', version: '1.7', lastUpdated: '2023-08-06', status: 'success' },
          ],
          systemPrompt: 'You are a process improvement assistant. Help with optimizing workflows and procedures.',
        },
        {
          id: 25,
          name: 'Sustainability Bot',
          tags: ['sustainability', 'environmental', 'green', 'eco-friendly'],
          links: [
            { url: 'https://example.com/sustainability-guide.pdf', version: '1.1', lastUpdated: '2023-08-07', status: 'success' },
          ],
          systemPrompt: 'You are a sustainability assistant. Help with environmental initiatives and green practices.',
        }
      ];
  };

  const calculateBotsPerPage = () => {
    // Get the container width
    const container = document.querySelector('.bot-list');
    if (!container) return 9; // Default to 9 (3 rows × 3 columns) if container not found

    // Calculate how many columns can fit (based on the 350px min-width from CSS)
    const containerWidth = container.clientWidth;
    const cardMinWidth = 350; // This should match the minmax value in CSS
    const columns = Math.floor(containerWidth / cardMinWidth);

    // Return columns × 3 rows
    return columns * 3;
  };

  const [botsPerPage, setBotsPerPage] = useState(9); // Start with default 9

  // Add resize listener to update botsPerPage
  useEffect(() => {
    const handleResize = () => {
      setBotsPerPage(calculateBotsPerPage());
    };

    // Initial calculation
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chatInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const chatHistoryRef = useRef(null);

  const [mode, setMode] = useState('search');
  const [searchText, setSearchText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredBots, setFilteredBots] = useState([]);
  const [pinnedBots, setPinnedBots] = useState([]);
  const [allBots, setAllBots] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [newTagText, setNewTagText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSavedSearchesList, setShowSavedSearchesList] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [expandedBots, setExpandedBots] = useState(() => {
    // Initialize all bots as expanded
    const initialBots = getInitialBots();
    return initialBots.reduce((acc, bot) => {
      acc[bot.id] = false;
      return acc;
    }, {});
  });

  useEffect(() => {
    const initialBots = getInitialBots();
    setAllBots(initialBots);
    setFilteredBots(initialBots);
    setSavedSearches(getInitialSavedSearches());
    setSearchSuggestions([]);
    setExpandedBots(initialBots.reduce((acc, bot) => {
      acc[bot.id] = false;
      return acc;
    }, {}));
    setTimeout(() => handleSearch(), 0);
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.style.height = '24px';
      const scrollHeight = searchInputRef.current.scrollHeight;
      const maxHeight = 48;
      searchInputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
    if (searchText.trim()) {
      handleSearch();
    }
  }, [searchText]);

  useEffect(() => {
    // Hide chat history when switching to search mode
    if (mode === 'search') {
      setChatHistory([]);
      // Show all bots in search mode if not showing pinned only
      if (!showPinnedOnly) {
        handleSearch();
      }
    } else {
      // In chat mode, only show pinned bots
      setFilteredBots(pinnedBots);
    }
  }, [mode]);

  useEffect(() => {
    if (showPinnedOnly) {
      setFilteredBots(pinnedBots);
    } else {
      // Only show all bots if in search mode
      if (mode === 'search') {
        handleSearch();
      }
    }
    setCurrentPage(1);
  }, [showPinnedOnly]);

  // Update filtered bots when pins change
  useEffect(() => {
    if (mode === 'chat' || showPinnedOnly) {
      setFilteredBots(pinnedBots);
      setCurrentPage(1);
    }
  }, [pinnedBots, mode]);

  const getInitialSavedSearches = () => {
    return [
        { name: 'Support Chat', searchText: 'support OR helpdesk', pinnedBots: [1] },
        { name: 'Sales and Pricing', searchText: 'sales AND pricing', pinnedBots: [2] },
        { name: 'HR Policies', searchText: 'hr OR policy', pinnedBots: [3] },
        { name: 'Technical Issues', searchText: 'technical AND support', pinnedBots: [4] },
        { name: 'Marketing Campaigns', searchText: 'marketing OR social media', pinnedBots: [5] },
        { name: 'Financial Reports', searchText: 'finance AND reports', pinnedBots: [6] },
      ];
  };

  const getInitialSearchSuggestions = () => {
    return [
        'support', 'sales', 'hr', 'pricing', 'helpdesk', 'technical', 'marketing', 'finance', 'legal', 'operations', 'product', 'it', 'customers', 'quotes', 'orders', 'employees', 'handbook', 'technical documents', 'promotions', 'campaigns', 'social media', 'advertising', 'accounting', 'budget', 'reports', 'expenses', 'compliance', 'contracts', 'agreements', 'regulations', 'logistics', 'supply chain', 'inventory', 'processes', 'innovation', 'design', 'features', 'roadmap', 'network', 'security', 'systems', 'infrastructure'
      ];
  };

  const handleSearch = () => {
    // Don't perform search in chat mode
    if (mode === 'chat') {
      return;
    }

    // Only filter if there's search text
    if (searchText.trim()) {
      let filtered = allBots.filter(bot => {
        const botName = bot.name.toLowerCase();
        const botTags = bot.tags.join(' ').toLowerCase();
        const botLinks = bot.links.map(link => link.url.toLowerCase()).join(' ');
        const botSystemPrompt = bot.systemPrompt.toLowerCase();
        
        // Split the search text into terms and handle AND/OR logic
        const searchTerms = searchText.toLowerCase().split(/\s+(?:and|or)\s+/);
        const andTerms = searchText.toLowerCase().match(/(\w+)\s+and\s+(\w+)/g);
        const orTerms = searchText.toLowerCase().match(/(\w+)\s+or\s+(\w+)/g);
        
        // Check if each term matches the bot's name, tags, links, or system prompt
        const termMatches = searchTerms.map(term => 
            botName.includes(term) || 
            botTags.includes(term) || 
            botLinks.includes(term) || 
            botSystemPrompt.includes(term)
        );
        
        if (andTerms) {
            // Handle AND conditions: All terms connected by AND must be true
            const andMatches = andTerms.map(andTerm => {
            const terms = andTerm.split(/\s+and\s+/);
            return terms.every(term => 
                botName.includes(term) || 
                botTags.includes(term) || 
                botLinks.includes(term) || 
                botSystemPrompt.includes(term)
            );
            });
            return andMatches.every(match => match);
        } else if (orTerms) {
            // Handle OR conditions: At least one term connected by OR must be true
            const orMatches = orTerms.map(orTerm => {
            const terms = orTerm.split(/\s+or\s+/);
            return terms.some(term => 
                botName.includes(term) || 
                botTags.includes(term) || 
                botLinks.includes(term) || 
                botSystemPrompt.includes(term)
            );
            });
            return termMatches.some(match => match) || orMatches.some(match => match);
        } else {
            // Default: If no AND/OR, any term match is sufficient
            return termMatches.some(match => match);
        }
      });

      if (showPinnedOnly) {
        filtered = filtered.filter(bot => pinnedBots.some(pinnedBot => pinnedBot.id === bot.id));
      }

      setFilteredBots(filtered);
      setCurrentPage(1);
    }
  };
  

    const handleChatSubmit = () => {
        if (searchText.trim() === '') return;
    
        const newMessage = {
        text: searchText,
        sender: 'user',
        };
    
        setChatHistory([...chatHistory, newMessage]);
        setSearchText('');
    
        // Simulate chatbot response (replace with actual API call)
        setTimeout(() => {
        const botResponse = {
            text: `This is a simulated response from ${pinnedBots.length > 0 ? pinnedBots.map(bot => bot.name).join(', ') : 'selected bots'}.`,
            sender: 'bot',
        };
        setChatHistory((prevChatHistory) => [...prevChatHistory, botResponse]);
        }, 500);
    };

    const handleNewChat = () => {
        setChatHistory([]);
        setSearchText('');
        setPinnedBots([]);
        setMode('search');
      };
    

  const togglePin = (botId) => {
    const bot = allBots.find((b) => b.id === botId);
    if (pinnedBots.find((b) => b.id === botId)) {
      setPinnedBots(pinnedBots.filter((b) => b.id !== botId));
    } else {
      setPinnedBots([...pinnedBots, bot]);
    }
  };

  const handleEdit = (botId, field, index = -1) => {
    const updatedBots = [...allBots];
    const botIndex = updatedBots.findIndex((bot) => bot.id === botId);

    if (botIndex === -1) return;

    let newValue = '';
    if (field === 'name') {
      newValue = prompt('Enter new name:', updatedBots[botIndex].name);
    } else if (field === 'tags') {
      newValue = prompt('Enter new tag:', index >= 0 ? updatedBots[botIndex].tags[index] : '');
    } else if (field === 'links') {
      newValue = prompt('Enter new link URL:', index >= 0 ? updatedBots[botIndex].links[index].url : '');
    } else if (field === 'systemPrompt') {
      newValue = prompt('Enter new system prompt:', updatedBots[botIndex].systemPrompt);
    }

    if (newValue === null || newValue.trim() === '') return;

    if (field === 'name') {
      updatedBots[botIndex].name = newValue;
    } else if (field === 'tags' && index >= 0) {
      updatedBots[botIndex].tags[index] = newValue;
    } else if (field === 'links' && index >= 0) {
      updatedBots[botIndex].links[index].url = newValue;
    } else if (field === 'systemPrompt') {
      updatedBots[botIndex].systemPrompt = newValue;
    }

    setAllBots(updatedBots);
  };

  const handleDelete = (botId, field, index = -1) => {
    const updatedBots = allBots.map((bot) => {
      if (bot.id === botId) {
        if (field === 'tags' && index >= 0) {
          return { ...bot, tags: bot.tags.filter((_, i) => i !== index) };
        } else if (field === 'links' && index >= 0) {
          return { ...bot, links: bot.links.filter((_, i) => i !== index) };
        } else if (field === 'bot') {
          if (window.confirm(`Are you sure you want to delete the bot "${bot.name}"?`)) {
            return null;
          }
          return bot;
        }
      }
      return bot;
    }).filter((bot) => bot !== null);
  
    setAllBots(updatedBots);
    setFilteredBots(prevFiltered => 
      prevFiltered.map(bot => {
        if (bot.id === botId) {
          if (field === 'tags' && index >= 0) {
            return { ...bot, tags: bot.tags.filter((_, i) => i !== index) };
          } else if (field === 'links' && index >= 0) {
            return { ...bot, links: bot.links.filter((_, i) => i !== index) };
          } else if (field === 'bot') {
            return null;
          }
        }
        return bot;
      }).filter(bot => bot !== null)
    );
    if (field === 'bot') {
      setPinnedBots(pinnedBots.filter((bot) => bot.id !== botId));
    }
  };
  
  const getLinkStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="status-icon success" />;
      case 'pending':
        return <FaCheckCircle className="status-icon pending" />;
      case 'failed':
        return <FaTimesCircle className="status-icon failed" />;
      default:
        return null;
    }
  };

  const getAllUniqueTags = () => {
    return [...new Set(allBots.flatMap(bot => bot.tags))];
  };

  const addTag = (botId) => {
    setNewTagText('');
    setTagSuggestions([]);
    
    // Create and show the tag input dialog
    const dialog = document.createElement('div');
    dialog.className = 'tag-input-dialog';
    dialog.innerHTML = `
      <div class="tag-input-content">
        <h4>Add New Tag</h4>
        <input type="text" id="new-tag-input" placeholder="Enter tag name..." />
        <div class="tag-suggestions"></div>
        <div class="dialog-buttons">
          <button class="cancel-button">Cancel</button>
          <button class="add-button">Add</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);

    const input = dialog.querySelector('#new-tag-input');
    const suggestionsDiv = dialog.querySelector('.tag-suggestions');
    
    input.focus();

    input.addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase();
      if (value) {
        const suggestions = getAllUniqueTags().filter(tag => 
          tag.toLowerCase().includes(value)
        );
        suggestionsDiv.innerHTML = suggestions
          .map(tag => `<div class="tag-suggestion">${tag}</div>`)
          .join('');
      } else {
        suggestionsDiv.innerHTML = '';
      }
    });

    suggestionsDiv.addEventListener('click', (e) => {
      if (e.target.classList.contains('tag-suggestion')) {
        input.value = e.target.textContent;
        suggestionsDiv.innerHTML = '';
      }
    });

    const handleAdd = () => {
      const newTag = input.value.trim();
      // Check if the bot already has this tag (case-insensitive)
      const bot = allBots.find(b => b.id === botId);
      const tagExists = bot.tags.some(tag => 
        tag.toLowerCase() === newTag.toLowerCase()
      );
      
      if (!newTag) {
        alert('Please enter a tag name.');
        return;
      }
      
      if (tagExists) {
        alert('This tag already exists on this bot.');
        return;
      }
      
      if (newTag) {
        const updatedBots = allBots.map((bot) =>
          bot.id === botId ? { ...bot, tags: [...bot.tags, newTag] } : bot
        );
        setAllBots(updatedBots);
        setFilteredBots(prevFiltered => 
          prevFiltered.map(bot => 
            bot.id === botId ? { ...bot, tags: [...bot.tags, newTag] } : bot
          )
        );
      }
      document.body.removeChild(dialog);
    };

    dialog.querySelector('.add-button').addEventListener('click', handleAdd);
    dialog.querySelector('.cancel-button').addEventListener('click', () => {
      document.body.removeChild(dialog);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleAdd();
      } else if (e.key === 'Escape') {
        document.body.removeChild(dialog);
      }
    });
  };

  const addLink = (botId) => {
    const newLinkUrl = prompt('Enter new link URL:');
    if (newLinkUrl) {
      const newLink = {
        url: newLinkUrl,
        version: '1.0',
        lastUpdated: new Date().toLocaleDateString(),
        status: 'pending',
      };
      const updatedBots = allBots.map((bot) =>
        bot.id === botId ? { ...bot, links: [...bot.links, newLink] } : bot
      );
      setAllBots(updatedBots);
      setFilteredBots(prevFiltered => 
        prevFiltered.map(bot => 
          bot.id === botId ? { ...bot, links: [...bot.links, newLink] } : bot
        )
      );
    }
  };

  const addBot = () => {
    const newBotName = prompt('Enter new bot name:');
    if (newBotName) {
      const newBot = {
        id: allBots.length + 1,
        name: newBotName,
        tags: [],
        links: [],
        systemPrompt: '',
      };
      const updatedBots = [newBot, ...allBots];
      setAllBots(updatedBots);
      if (!showPinnedOnly) {
        setFilteredBots(prev => [newBot, ...prev]);
      }
      setCurrentPage(1);
    }
  };

  const saveCurrentSearch = () => {
    const name = prompt('Enter a name for this search:');
    if (name) {
      setSavedSearches([
        ...savedSearches,
        { name, searchText, pinnedBots: pinnedBots.map((bot) => bot.id) },
      ]);
    }
  };

  const handleLoadSearch = (search) => {
    setSearchText(search.searchText);
    setPinnedBots(allBots.filter((bot) => search.pinnedBots.includes(bot.id)));
    handleSearch();
    setMode('search');
    setShowSavedSearchesList(false);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const botId = parseInt(event.target.dataset.botId);
    if (!botId || !allBots.some((bot) => bot.id === botId)) {
      alert('Invalid bot ID.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      let links = [];

      if (file.type === 'text/csv') {
        links = content.split(/\r?\n/).map((line) => line.split(',')[0].trim());
      } else {
        links = content.split(/\r?\n/).map((line) => line.trim());
      }

      links = links.filter((link) => link);

      if (links.length > 0) {
        const updatedBots = allBots.map((bot) => {
          if (bot.id === botId) {
            const newLinks = links.map((url) => ({
              url,
              version: '1.0',
              lastUpdated: new Date().toLocaleDateString(),
              status: 'pending',
            }));
            return { ...bot, links: [...bot.links, ...newLinks] };
          }
          return bot;
        });
        setAllBots(updatedBots);
        setFilteredBots(prevFiltered => 
          prevFiltered.map(bot => 
            bot.id === botId ? updatedBots.find(b => b.id === botId) : bot
          )
        );
      }
    };

    reader.onerror = () => {
      alert('Error reading file.');
    };

    reader.readAsText(file);
    event.target.value = ''; // Reset the file input
  };

  const stats = {
    numBots: pinnedBots.length,
    numFiles: pinnedBots.length > 0 
      ? pinnedBots.reduce((total, bot) => total + bot.links.length, 0)
      : filteredBots.reduce((total, bot) => total + bot.links.length, 0),
    totalTags: pinnedBots.length > 0
      ? new Set(pinnedBots.flatMap((bot) => bot.tags)).size
      : new Set(filteredBots.flatMap((bot) => bot.tags)).size,
  };

  const handleSearchTextChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
   
    // Only resize if content exceeds 3 lines
    if (searchInputRef.current) {
      const lineHeight = 24;
      const minHeight = lineHeight * 3;  // 3 lines
      const maxHeight = 200;  // maximum height
      
      if (searchInputRef.current.scrollHeight > minHeight) {
        searchInputRef.current.style.height = 
          `${Math.min(searchInputRef.current.scrollHeight, maxHeight)}px`;
      }
    }
   
    setSearchSuggestions(
      newSearchText
        ? getInitialSearchSuggestions().filter((item) =>
            item.toLowerCase().includes(newSearchText.toLowerCase())
          )
        : []
    );
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setSearchSuggestions([]);
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleSavedSearchesList = () => {
    setShowSavedSearchesList(!showSavedSearchesList);
  };

  const toggleExpand = (botId) => {
    setExpandedBots((prevExpandedBots) => ({
      ...prevExpandedBots,
      [botId]: !prevExpandedBots[botId],
    }));
  };

  const indexOfLastBot = currentPage * botsPerPage;
  const indexOfFirstBot = indexOfLastBot - botsPerPage;
  const currentBots = filteredBots.slice(indexOfFirstBot, indexOfLastBot);

  const handleContextMenu = (e, type, botId, index) => {
    e.preventDefault();
    const options = ['Edit', 'Delete'];
    
    if ('ontouchstart' in window) {
      // For mobile
      const choice = window.prompt(`Choose action (1: Edit, 2: Delete):`, '1');
      if (choice === '1') handleEdit(botId, type, index);
      else if (choice === '2') handleDelete(botId, type, index);
    } else {
      // For desktop
      if (window.confirm(`Edit or delete? OK for edit, Cancel for delete`)) {
        handleEdit(botId, type, index);
      } else {
        handleDelete(botId, type, index);
      }
    }
  };

  const handleSystemPromptEdit = (botId, newPrompt) => {
    const updatedBots = allBots.map(bot => 
      bot.id === botId ? { ...bot, systemPrompt: newPrompt } : bot
    );
    setAllBots(updatedBots);
    setFilteredBots(prevFiltered => 
      prevFiltered.map(bot => 
        bot.id === botId ? { ...bot, systemPrompt: newPrompt } : bot
      )
    );
  };

  return (
    <div className="veyr-container">
        <input 
          type="file" 
          id="file-upload" 
          accept=".csv,.txt" 
          style={{ display: 'none' }} 
          onChange={handleUpload}
        />
        <div className="header">
            <button 
                className="hamburger-menu" 
                onClick={() => setShowMenu(!showMenu)}
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>
            <h1>VeyR</h1>
            <span className="header-subtitle">- The Intralox Chatbot Aggregator</span>
            <div className="mode-toggle">
            <button
                className={mode === 'search' ? 'active' : ''}
                onClick={() => setMode('search')}
            >
                <FaSearch />
            </button>
            <button
                className={mode === 'chat' ? 'active' : ''}
                onClick={() => {
                    setMode('chat');
                    setSearchText(''); // Clear the search text
                  }}
            >
                <FaComment />
            </button>
            </div>
        </div>

        {showMenu && (
            <>
            <div 
                className={`menu-overlay ${showMenu ? 'active' : ''}`}
                onClick={() => setShowMenu(false)}
            ></div>
            <div className={`menu-content ${showMenu ? 'active' : ''}`}>
                    <button onClick={() => {/* handle profile */}}>Profile</button>
                    <button onClick={() => {/* handle settings */}}>Settings</button>
                    <button onClick={() => {/* handle support */}}>Support</button>
                    <button onClick={() => {/* handle sign out */}}>Sign Out</button>
            </div>
            </>
        )}

        <div className="search-chat-area">
            <div className="input-mode-container">
                <textarea
                    ref={searchInputRef}
                    className="search-chat-input"
                    placeholder={
                    mode === 'search'
                        ? 'Search for chatbots...'
                        : 'Enter your message...'
                    }
                    value={searchText}
                    onChange={handleSearchTextChange}
                    onKeyDown={(e) => {
                    if (mode === 'chat' && e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); // Prevent newline
                        handleChatSubmit();
                    }
                    }}
                />
                {searchText && (
                    <button 
                        className="clear-text-button"
                        onClick={() => {
                            setSearchText('');
                            if (searchInputRef.current) {
                                searchInputRef.current.focus();
                            }
                        }}
                    >
                        <FaTimes />
                    </button>
                )}

                {mode === 'search' && (
                    <div className="search-suggestions">
                    {searchSuggestions.map((suggestion, index) => (
                        <div
                        key={index}
                        className="suggestion"
                        onClick={() => handleSuggestionClick(suggestion)}
                        >
                        {suggestion}
                        </div>
                    ))}
                    </div>
                )}

                {mode === 'chat' && (
                    <button className="chat-submit-button" onClick={handleChatSubmit}>
                    <FaArrowUp />
                    </button>
                )}
            </div>
        </div>

        {mode === 'chat' && (
            <div className="chat-history" ref={chatHistoryRef}>
              {chatHistory.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
              {chatHistory.length > 0 && (
                <button className="clear-chat" onClick={() => setChatHistory([])}>
                  Clear Chat
                </button>
              )}
            </div>
        )}

      <div className="controls">
        <button onClick={() => setShowHelp(!showHelp)}>
          <FaQuestionCircle /> Help
        </button>
        <button onClick={() => setShowStats(!showStats)}>
          <FaPlus /> Statistics
        </button>
        <button onClick={addBot}>
          <FaPlus /> Add Bot
        </button>
        <button onClick={() => setShowPinnedOnly(!showPinnedOnly)}>
          {showPinnedOnly ? <FaSearch /> : <FaThumbtack />}
          {showPinnedOnly ? 'Show All' : 'Show Pinned'}
        </button>
        {pinnedBots.length > 0 && (
          <button onClick={() => {
            setPinnedBots([]);
            setMode('search');
            setShowPinnedOnly(false);
            handleSearch();
          }}>
            <FaThumbtack /> Clear All Pins
          </button>
        )}
      </div>

      {showHelp && (
        <div className="help-section">
          <h3>Help</h3>
          <p>
            <b>Search Mode:</b> Enter keywords to search for chatbots. Use "AND" and "OR" for
            complex queries.
          </p>
          <p>
            <b>Chat Mode:</b> Select chatbots to chat with. Type your message in the text area
            and click the send button.
          </p>
          <p>
            <b>Pinning:</b> Click the pin icon to pin a chatbot. Pinned chatbots are included in
            the chat.
          </p>
          <p>
            <b>Editing/Deleting:</b> Right-click (or long press) on a chatbot card, tag, or link to edit or delete it.
          </p>
          <p>
            <b>Adding Items:</b> Click the "+" buttons to add new tags, links, or bots.
          </p>
          <p>
            <b>Saving Searches:</b> Click "Save Search" to save your current search and pinned
            bots for later.
          </p>
          <p>
            <b>Uploading Links:</b> Click "
            <FaFileCsv />
            " to upload a CSV file containing links to add to a bot's knowledge.
          </p>
          <p>
            <b>CSV File Format:</b>
          </p>
          <div className="csv-format-table">
            <table>
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Required</th>
                  <th>Description</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>url</code></td>
                  <td>Yes</td>
                  <td>Employee Handbook</td>
                  <td>https://docs.company.com/policies/employee-handbook.pdf</td>
                </tr>
                <tr>
                  <td><code>url</code></td>
                  <td>No</td>
                  <td>Customer Service Training 101</td>
                  <td>https://docs.company.com/customer-service/101.docx</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <b>Important Notes:</b>
            <ul>
              <li>Each row must be on a new line</li>
              <li>Do not include spaces after commas</li>
              <li>Use quotation marks only if values contain commas</li>
              <li>Empty lines are ignored</li>
              <li>URLs should not contain commas</li>
            </ul>
          </p>
          <p>
            <b>Colored Circles with Check Marks:</b>
          </p>
          <ul>
            <li>
              <FaCheckCircle className="status-icon success" /> Green: File has been successfully
              parsed and vectorized.
            </li>
            <li>
              <FaCheckCircle className="status-icon pending" /> Orange: File has been uploaded but
              is still being processed.
            </li>
            <li>
              <FaTimesCircle className="status-icon failed" /> Red: File failed to be parsed or
              vectorized.
            </li>
          </ul>
        </div>
      )}

      {showStats && (
        <div className="stats-section">
          <h3>Statistics</h3>
          {pinnedBots.length > 0 ? (
            <>
              <p>Pinned Bots: {stats.numBots}</p>
              <p>Files in Pinned Bots: {stats.numFiles}</p>
              <p>Tags in Pinned Bots: {stats.totalTags}</p>
            </>
          ) : (
            <>
              <p>Total Bots: {filteredBots.length}</p>
              <p>Total Files: {stats.numFiles}</p>
              <p>Total Tags: {stats.totalTags}</p>
            </>
          )}
        </div>
      )}

        <div className="saved-searches-section">
            <button 
              className="saved-searches-link" 
              onClick={toggleSavedSearchesList}
            >
              {showSavedSearchesList ? 'Close Saved Searches' : 'Saved Searches'}
            </button>
            {showSavedSearchesList && (
                <div className="saved-searches-list">
                {savedSearches.map((search, index) => (
                    <div
                    key={index}
                    className="saved-search"
                    onClick={() => handleLoadSearch(search)}
                    >
                    {search.name}
                    </div>
                ))}
                </div>
            )}
        </div>

      <div className="bot-list">
        {currentBots.map((bot) => (
          <div
            key={bot.id}
            className="bot-card"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            <div className="bot-header">
              <h3>{bot.name}</h3>
              <div className="bot-actions">
                <button className="pin-button" onClick={() => togglePin(bot.id)}>
                  <FaThumbtack className={pinnedBots.some((b) => b.id === bot.id) ? 'pinned' : ''} />
                </button>
                <button
                  className="edit-button hidden"
                  onClick={() => handleEdit(bot.id, 'name')}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-button hidden"
                  onClick={() => handleDelete(bot.id, 'bot')}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="bot-tags-container">
                <div className="bot-tags">
                    {bot.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                    <button className="add-tag-button" onClick={() => addTag(bot.id)}>
                        <FaPlus />
                    </button>
                </div>
            </div>
            <button className="expand-button" onClick={() => toggleExpand(bot.id)}>
                {expandedBots[bot.id] ? 'Less' : 'More'}
            </button>

            {expandedBots[bot.id] && (
                <div className="bot-expanded-content">
                <div className="bot-links">
                    {bot.links.map((link, index) => (
                    <div
                        key={index}
                        className="link"
                        onContextMenu={(e) => {
                        e.preventDefault();
                        if (window.confirm(`Edit or delete link "${link.url}"?`)) {
                            handleEdit(bot.id, 'links', index);
                        } else {
                            handleDelete(bot.id, 'links', index);
                        }
                        }}
                    >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.url}
                        </a>
                        {getLinkStatusIcon(link.status)}
                        <span className="version">v{link.version}</span>
                        <span className="last-updated">({link.lastUpdated})</span>
                    </div>
                    ))}
                    <div className="link-actions">
                        <button className="add-link-button" onClick={() => addLink(bot.id)}>
                            <FaPlus />
                        </button>
                        <button 
                            className="upload-links-button" 
                            onClick={() => {
                              const fileInput = document.getElementById('file-upload');
                              if (fileInput) {
                                fileInput.dataset.botId = bot.id.toString(); // Store the bot ID
                                fileInput.click();
                              }
                            }}
                        >
                            <FaFileCsv />
                        </button>
                    </div>
                </div>
                <div className="bot-system-prompt">
                    <div className="system-prompt-header">
                        <h4>System Prompt:</h4>
                        <button 
                            className="edit-button"
                            onClick={(e) => {
                                e.preventDefault();
                                const textarea = e.target.closest('.bot-system-prompt').querySelector('textarea');
                                textarea.readOnly = !textarea.readOnly;
                                textarea.focus();
                            }}
                        >
                            <FaEdit />
                        </button>
                    </div>
                    <textarea
                        value={bot.systemPrompt}
                        onChange={(e) => handleSystemPromptEdit(bot.id, e.target.value)}
                    />
                </div>
                </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>
            Showing {indexOfFirstBot + 1} to {Math.min(indexOfLastBot, filteredBots.length)} of {filteredBots.length}
        </span>
        {Array.from({ length: Math.ceil(filteredBots.length / botsPerPage) }, (_, i) => (
            <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => handlePageChange(i + 1)}
            >
            {i + 1}
            </button>
        ))}
        </div>
    </div>
  );
}

export default App;