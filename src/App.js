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
  FaChevronDown,
  FaChevronUp,
  FaLink,
} from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

function App() {
  const getInitialBots = () => {
    return [
        {
          id: 1,
          name: 'Customer Support Bot',
          tags: ['support', 'inquiries', 'helpdesk', 'customers'],
          links: [
            { url: 'https://www.sharepoint.com/example101', version: '1.2', lastUpdated: '2023-07-20', status: 'success' },
            { url: 'https://www.sharepoint.com/example102', version: '2.0', lastUpdated: '2023-07-25', status: 'pending' },
          ],
          systemPrompt: 'You are a helpful customer support assistant. You have been trained on the following documents: [links]. Please answer questions based on the information in these documents.',
        },
        {
          id: 2,
          name: 'Sales Inquiry Bot',
          tags: ['sales', 'pricing', 'products', 'quotes', 'orders'],
          links: [
            { url: 'https://www.sharepoint.com/example201', version: '3.1', lastUpdated: '2023-07-15', status: 'success' },
            { url: 'https://www.sharepoint.com/example202', version: '1.8', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a sales assistant providing information about our products and pricing. You are familiar with the following documents: [links]. Please provide accurate quotes and answer sales-related questions.',
        },
        {
          id: 3,
          name: 'HR Policy Bot',
          tags: ['hr', 'policy', 'benefits', 'onboarding', 'employees', 'handbook'],
          links: [
            { url: 'https://www.sharepoint.com/example301', version: '4.0', lastUpdated: '2023-07-10', status: 'success' },
            { url: 'https://www.sharepoint.com/example302', version: '1.5', lastUpdated: '2023-07-22', status: 'failed' },
            { url: 'https://www.sharepoint.com/example303', version: '2.2', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are an HR assistant providing information about company policies, benefits, and onboarding procedures. You have access to the following documents: [links]. Please answer questions based on these resources.',
        },
        {
          id: 4,
          name: 'Technical Support Bot',
          tags: ['technical', 'support', 'troubleshooting', 'issues', 'helpdesk', 'technical documents'],
          links: [
            { url: 'https://www.sharepoint.com/example401', version: '1.0', lastUpdated: '2023-07-18', status: 'success' },
            { url: 'https://www.sharepoint.com/example402', version: '1.2', lastUpdated: '2023-07-25', status: 'success' },
          ],
          systemPrompt: 'You are a technical support assistant. You are knowledgeable about our products and have access to technical documents. Please assist users with troubleshooting and resolving technical issues.',
        },
        {
          id: 5,
          name: 'Marketing Bot',
          tags: ['marketing', 'promotions', 'campaigns', 'social media', 'advertising'],
          links: [
            { url: 'https://www.sharepoint.com/example501', version: '2.5', lastUpdated: '2023-07-26', status: 'pending' },
            { url: 'https://www.sharepoint.com/example502', version: '1.1', lastUpdated: '2023-07-21', status: 'success' },
          ],
          systemPrompt: 'You are a marketing assistant. You are familiar with our marketing campaigns, promotions, and social media guidelines. Please provide information about our marketing efforts.',
        },
        {
          id: 6,
          name: 'Financial Bot',
          tags: ['finance', 'accounting', 'budget', 'reports', 'expenses'],
          links: [
            { url: 'https://www.sharepoint.com/example601', version: '4.2', lastUpdated: '2023-07-29', status: 'success' },
            { url: 'https://www.sharepoint.com/example602', version: '1.3', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are a financial assistant. You have access to financial reports and budget guidelines. Please assist with questions related to finance and accounting.',
        },
        {
          id: 7,
          name: 'Legal Bot',
          tags: ['legal', 'compliance', 'contracts', 'agreements', 'regulations'],
          links: [
            { url: 'https://www.sharepoint.com/example701', version: '3.0', lastUpdated: '2023-07-23', status: 'success' },
            { url: 'https://www.sharepoint.com/example702', version: '1.9', lastUpdated: '2023-07-28', status: 'failed' },
          ],
          systemPrompt: 'You are a legal assistant. You are knowledgeable about legal documents, compliance, and regulations. Please provide information based on legal resources.',
        },
        {
          id: 8,
          name: 'Operations Bot',
          tags: ['operations', 'logistics', 'supply chain', 'inventory', 'processes'],
          links: [
            { url: 'https://www.sharepoint.com/example801', version: '2.1', lastUpdated: '2023-07-20', status: 'success' },
            { url: 'https://www.sharepoint.com/example802', version: '1.6', lastUpdated: '2023-07-26', status: 'success' },
          ],
          systemPrompt: 'You are an operations assistant. You are familiar with our operations manual and inventory reports. Please assist with questions related to logistics and supply chain processes.',
        },
        {
          id: 9,
          name: 'Product Development Bot',
          tags: ['product', 'development', 'innovation', 'design', 'features', 'roadmap'],
          links: [
            { url: 'https://www.sharepoint.com/example901', version: '5.0', lastUpdated: '2023-07-25', status: 'success' },
            { url: 'https://www.sharepoint.com/example902', version: '2.4', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are a product development assistant. You have access to the product roadmap and design specifications. Please provide information about product features and development plans.',
        },
        {
          id: 10,
          name: 'IT Support Bot',
          tags: ['it', 'support', 'network', 'security', 'systems', 'infrastructure', 'helpdesk'],
          links: [
            { url: 'https://www.sharepoint.com/example1001', version: '1.7', lastUpdated: '2023-07-22', status: 'success' },
            { url: 'https://www.sharepoint.com/example1002', version: '1.1', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are an IT support assistant. You are knowledgeable about IT security policies and network infrastructure. Please assist with questions related to IT systems and security.',
        },
        {
          id: 11,
          name: 'Quality Assurance Bot',
          tags: ['qa', 'testing', 'quality', 'standards'],
          links: [
            { url: 'https://www.sharepoint.com/example1101', version: '2.0', lastUpdated: '2023-07-24', status: 'success' },
            { url: 'https://www.sharepoint.com/example1102', version: '1.3', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a QA assistant. Help with testing procedures and quality standards.',
        },
        {
          id: 12,
          name: 'Project Management Bot',
          tags: ['project', 'management', 'planning', 'agile', 'scrum'],
          links: [
            { url: 'https://www.sharepoint.com/example1201', version: '3.0', lastUpdated: '2023-07-25', status: 'success' },
          ],
          systemPrompt: 'You are a project management assistant. Help with project planning and agile methodologies.',
        },
        {
          id: 13,
          name: 'Data Analytics Bot',
          tags: ['data', 'analytics', 'reporting', 'metrics'],
          links: [
            { url: 'https://www.sharepoint.com/example1301', version: '1.5', lastUpdated: '2023-07-26', status: 'success' },
          ],
          systemPrompt: 'You are a data analytics assistant. Help with data interpretation and reporting.',
        },
        {
          id: 14,
          name: 'Compliance Bot',
          tags: ['compliance', 'regulations', 'audit', 'standards'],
          links: [
            { url: 'https://www.sharepoint.com/example1401', version: '2.1', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are a compliance assistant. Help with regulatory requirements and audits.',
        },
        {
          id: 15,
          name: 'Training Bot',
          tags: ['training', 'learning', 'development', 'education'],
          links: [
            { url: 'https://www.sharepoint.com/example1501', version: '1.8', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a training assistant. Help with learning and development programs.',
        },
        {
          id: 16,
          name: 'Facilities Bot',
          tags: ['facilities', 'maintenance', 'building', 'equipment'],
          links: [
            { url: 'https://www.sharepoint.com/example1601', version: '1.2', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are a facilities assistant. Help with building maintenance and equipment.',
        },
        {
          id: 17,
          name: 'Research Bot',
          tags: ['research', 'development', 'innovation', 'studies'],
          links: [
            { url: 'https://www.sharepoint.com/example1701', version: '2.4', lastUpdated: '2023-07-30', status: 'success' },
          ],
          systemPrompt: 'You are a research assistant. Help with research and development projects.',
        },
        {
          id: 18,
          name: 'Security Bot',
          tags: ['security', 'safety', 'protection', 'protocols'],
          links: [
            { url: 'https://www.sharepoint.com/example1801', version: '3.2', lastUpdated: '2023-07-31', status: 'success' },
          ],
          systemPrompt: 'You are a security assistant. Help with safety and security procedures.',
        },
        {
          id: 19,
          name: 'Supply Chain Bot',
          tags: ['supply', 'chain', 'logistics', 'inventory'],
          links: [
            { url: 'https://www.sharepoint.com/example1901', version: '1.6', lastUpdated: '2023-08-01', status: 'success' },
          ],
          systemPrompt: 'You are a supply chain assistant. Help with logistics and inventory management.',
        },
        {
          id: 20,
          name: 'Risk Management Bot',
          tags: ['risk', 'management', 'assessment', 'mitigation'],
          links: [
            { url: 'https://www.sharepoint.com/example2001', version: '2.3', lastUpdated: '2023-08-02', status: 'success' },
          ],
          systemPrompt: 'You are a risk management assistant. Help with risk assessment and mitigation strategies.',
        },
        {
          id: 21,
          name: 'Change Management Bot',
          tags: ['change', 'management', 'transition', 'transformation'],
          links: [
            { url: 'https://www.sharepoint.com/example2101', version: '1.4', lastUpdated: '2023-08-03', status: 'success' },
          ],
          systemPrompt: 'You are a change management assistant. Help with organizational transitions.',
        },
        {
          id: 22,
          name: 'Innovation Bot',
          tags: ['innovation', 'ideas', 'creativity', 'development'],
          links: [
            { url: 'https://www.sharepoint.com/example2201', version: '1.9', lastUpdated: '2023-08-04', status: 'success' },
          ],
          systemPrompt: 'You are an innovation assistant. Help with creative problem-solving and new ideas.',
        },
        {
          id: 23,
          name: 'Documentation Bot',
          tags: ['documentation', 'writing', 'procedures', 'manuals'],
          links: [
            { url: 'https://www.sharepoint.com/example2301', version: '2.2', lastUpdated: '2023-08-05', status: 'success' },
          ],
          systemPrompt: 'You are a documentation assistant. Help with writing and maintaining documentation.',
        },
        {
          id: 24,
          name: 'Process Improvement Bot',
          tags: ['process', 'improvement', 'optimization', 'efficiency'],
          links: [
            { url: 'https://www.sharepoint.com/example2401', version: '1.7', lastUpdated: '2023-08-06', status: 'success' },
          ],
          systemPrompt: 'You are a process improvement assistant. Help with optimizing workflows and procedures.',
        },
        {
          id: 25,
          name: 'Sustainability Bot',
          tags: ['sustainability', 'environmental', 'green', 'eco-friendly'],
          links: [
            { url: 'https://www.sharepoint.com/example2501', version: '1.1', lastUpdated: '2023-08-07', status: 'success' },
          ],
          systemPrompt: 'You are a sustainability assistant. Help with environmental initiatives and green practices.',
        }
      ];
  };

  const calculateBotsPerPage = () => {
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
      return 10; // Show 10 cards per page on mobile
    } else {
      // Desktop layout calculation
      const container = document.querySelector('.bot-list');
      if (!container) return 9;
      
      const containerWidth = container.clientWidth;
      const cardMinWidth = 350;
      const columns = Math.floor(containerWidth / cardMinWidth);
      return columns * 3;
    }
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

  const [contextMenu, setContextMenu] = useState({ 
    show: false, 
    x: 0, 
    y: 0, 
    type: null, 
    itemId: null, 
    index: null 
  });

  const controlsRef = useRef(null);

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
      // Only show pinned bots if there are any, otherwise show all bots
      if (pinnedBots.length > 0) {
        setFilteredBots(pinnedBots);
      } else {
        // If no pins, disable pinned view and show all bots
        setShowPinnedOnly(false);
        setFilteredBots(allBots);
      }
    } else {
      // When showing all, either show search results or all bots
      if (searchText.trim()) {
        handleSearch();
      } else {
        setFilteredBots(allBots);
      }
    }
    setCurrentPage(1);
  }, [showPinnedOnly, allBots, pinnedBots, searchText]);

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
    if (!bot) return;
    
    if (pinnedBots.find((b) => b.id === botId)) {
      setPinnedBots(pinnedBots.filter((b) => b.id !== botId));
    } else {
      setPinnedBots([...pinnedBots, bot]);
    }
    
    // Force re-render of the pin button
    setAllBots(prev => [...prev]);
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

  const handleContextMenu = (e, type, itemId, index = null) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    setContextMenu({
      show: true,
      x: e.clientX || rect.left,
      y: e.clientY || rect.bottom,
      type,
      itemId,
      index
    });
  };

  // Add click handler to close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setContextMenu({ show: false });
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

  // Check if controls overflow and need scrolling
  const checkControlsOverflow = () => {
    if (controlsRef.current) {
      const hasOverflow = controlsRef.current.scrollWidth > controlsRef.current.clientWidth;
      controlsRef.current.classList.toggle('has-overflow', hasOverflow && pinnedBots.length > 0);
    }
  };

  // Auto-scroll to show Clear All Pins when pins change
  useEffect(() => {
    if (controlsRef.current && pinnedBots.length > 0) {
      controlsRef.current.scrollTo({
        left: controlsRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  }, [pinnedBots.length]);

  // Check for overflow on mount and resize
  useEffect(() => {
    checkControlsOverflow();
    window.addEventListener('resize', checkControlsOverflow);
    return () => window.removeEventListener('resize', checkControlsOverflow);
  }, [pinnedBots.length]);

  const handleAddSharePointLink = (botId) => {
    const dialog = document.createElement('div');
    dialog.className = 'sharepoint-dialog';
    dialog.innerHTML = `
      <div class="sharepoint-content">
        <h4>SharePoint Site</h4>
        <input 
          type="text" 
          id="sharepoint-input" 
          placeholder="https://www.sharepoint.com/example123"
          value="${allBots.find(bot => bot.id === botId)?.links[0]?.url || ''}"
        />
        <div class="dialog-buttons">
          <button class="cancel-button">Cancel</button>
          <button class="add-button">Add</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
    
    const input = dialog.querySelector('#sharepoint-input');
    input.focus();
    
    const handleAdd = () => {
      const url = input.value.trim();
      if (url) {
        const newLink = {
          url,
          status: 'pending',
          description: url.split('/').pop() || 'SharePoint Site'
        };
        const updatedBots = allBots.map((bot) =>
          bot.id === botId ? { ...bot, links: [newLink] } : bot
        );
        setAllBots(updatedBots);
        setFilteredBots(prevFiltered => 
          prevFiltered.map(bot => 
            bot.id === botId ? { ...bot, links: [newLink] } : bot
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
      if (e.key === 'Enter') handleAdd();
      if (e.key === 'Escape') document.body.removeChild(dialog);
    });
  };

  const LinkStatusDashboard = ({ links, botId }) => {
    // Generate different stats based on botId
    const getStatsForBot = (id) => {
      const baseStats = {
        1: { success: 342, pending: 15, failed: 3 },    // Customer Support Bot
        2: { success: 256, pending: 8, failed: 5 },     // Sales Inquiry Bot
        3: { success: 189, pending: 23, failed: 7 },    // HR Policy Bot
        4: { success: 423, pending: 12, failed: 4 },    // Technical Support Bot
        5: { success: 167, pending: 19, failed: 2 },    // Marketing Bot
        6: { success: 298, pending: 7, failed: 6 },     // Financial Bot
        7: { success: 156, pending: 14, failed: 8 },    // Legal Bot
        8: { success: 234, pending: 9, failed: 3 },     // Operations Bot
        9: { success: 312, pending: 16, failed: 5 },    // Product Development Bot
        10: { success: 278, pending: 11, failed: 4 },   // IT Support Bot
        11: { success: 145, pending: 8, failed: 2 },    // Quality Assurance Bot
        12: { success: 198, pending: 13, failed: 6 },   // Project Management Bot
        13: { success: 467, pending: 21, failed: 9 },   // Data Analytics Bot
        14: { success: 223, pending: 17, failed: 3 },   // Compliance Bot
        15: { success: 178, pending: 12, failed: 4 },   // Training Bot
        16: { success: 134, pending: 6, failed: 2 },    // Facilities Bot
        17: { success: 289, pending: 18, failed: 7 },   // Research Bot
        18: { success: 156, pending: 9, failed: 3 },    // Security Bot
        19: { success: 245, pending: 14, failed: 5 },   // Supply Chain Bot
        20: { success: 167, pending: 11, failed: 4 },   // Risk Management Bot
        21: { success: 143, pending: 8, failed: 2 },    // Change Management Bot
        22: { success: 198, pending: 15, failed: 6 },   // Innovation Bot
        23: { success: 267, pending: 13, failed: 5 },   // Documentation Bot
        24: { success: 189, pending: 10, failed: 3 },   // Process Improvement Bot
        25: { success: 145, pending: 7, failed: 2 }     // Sustainability Bot
      };
      return baseStats[id] || { success: 0, pending: 0, failed: 0 };
    };

    const stats = getStatsForBot(botId);

    return (
      <div className="link-status-dashboard">
        <div className="status-item">
          <FaCheckCircle className="status-icon success" />
          <span className="status-count">{stats.success}</span>
          <span className="status-label">Processed</span>
        </div>
        <div className="status-item">
          <FaCheckCircle className="status-icon pending" />
          <span className="status-count">{stats.pending}</span>
          <span className="status-label">Processing</span>
        </div>
        <div className="status-item">
          <FaTimesCircle className="status-icon failed" />
          <span className="status-count">{stats.failed}</span>
          <span className="status-label">Failed</span>
        </div>
      </div>
    );
  };

  // Add a new state to track edit mode for system prompts
  const [editingPrompts, setEditingPrompts] = useState({});

  return (
    <div className="veyr-container" data-mode={mode}>
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
            style={{ display: showMenu ? 'none' : 'flex' }}
          >
            {window.innerWidth <= 768 ? (
              <GiHamburgerMenu size={24} />
            ) : (
              <>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </>
            )}
          </button>
          <div className="header-content">
            <div className="title-row">
              <h1>VeyR</h1>
              <span className="header-subtitle">- The Intralox Chatbot Aggregator</span>
            </div>
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
                  setSearchText('');
                }}
              >
                <FaComment />
              </button>
            </div>
          </div>
        </div>

        {showMenu && (
            <>
            <div 
                className={`menu-overlay ${showMenu ? 'active' : ''}`}
                onClick={() => setShowMenu(false)}
            ></div>
            <div className={`menu-content ${showMenu ? 'active' : ''}`}>
                <div className="menu-close" onClick={() => setShowMenu(false)}>
                    <FaTimes className="close-icon" /> Close Menu
                </div>
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
                        : `Chat with ${pinnedBots.length} selected chatbot${pinnedBots.length !== 1 ? 's' : ''}`
                    }
                    value={searchText}
                    onChange={handleSearchTextChange}
                    onKeyDown={(e) => {
                      if (mode === 'chat' && e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
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
          <>
            <div className="chat-history" ref={chatHistoryRef}>
              {chatHistory.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
            </div>
            {chatHistory.length > 0 && (
              <div className="chat-controls">
                <button className="clear-chat" onClick={() => setChatHistory([])}>
                  Clear Chat
                </button>
              </div>
            )}
          </>
        )}

      {mode === 'search' && (
        <div className="controls" ref={controlsRef}>
          <button onClick={() => setShowHelp(!showHelp)}>
            <FaQuestionCircle /> Help
          </button>
          <button onClick={() => setShowStats(!showStats)}>
            <FaPlus /> Statistics
          </button>
          <button onClick={addBot}>
            <FaPlus /> Add Bot
          </button>
          <button onClick={() => {
            const unpinnedBots = allBots.filter(bot => !pinnedBots.some(p => p.id === bot.id));
            setPinnedBots([...pinnedBots, ...unpinnedBots]);
          }}>
            <FaThumbtack /> Pin All
          </button>
          {pinnedBots.length >= 2 && (
            <button onClick={() => setShowPinnedOnly(!showPinnedOnly)}>
              {showPinnedOnly ? <FaSearch /> : <FaThumbtack />}
              {showPinnedOnly ? 'Show All' : 'Show Pinned'}
            </button>
          )}
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
      )}

      {mode === 'search' && (
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
      )}

      <div className="bot-list">
        {(window.innerWidth <= 768 ? 
          filteredBots.slice(indexOfFirstBot, indexOfLastBot) : 
          currentBots
        ).map((bot) => (
          <div
            key={bot.id}
            className="bot-card"
            onContextMenu={(e) => handleContextMenu(e, 'bot', bot.id)}
          >
            <div className="bot-header">
              <h3>{bot.name}</h3>
              <div className="bot-actions">
                <button className="pin-button" onClick={() => togglePin(bot.id)}>
                  <FaThumbtack 
                    className={pinnedBots.some((b) => b.id === bot.id) ? 'pinned' : ''}
                    style={{ transform: pinnedBots.some((b) => b.id === bot.id) ? 'rotate(45deg)' : 'none' }}
                  />
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
                        <span 
                          key={index} 
                          className="tag"
                          onContextMenu={(e) => handleContextMenu(e, 'tag', bot.id, index)}
                        >
                          {tag}
                        </span>
                    ))}
                    <button className="add-tag-button" onClick={() => addTag(bot.id)}>
                        <FaPlus />
                    </button>
                </div>
            </div>
            <button className="expand-button" onClick={() => toggleExpand(bot.id)}>
                {expandedBots[bot.id] ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {expandedBots[bot.id] && (
                <div className="bot-expanded-content">
                <div className="bot-links">
                    <button className="add-sharepoint-link" onClick={() => handleAddSharePointLink(bot.id)}>
                      <FaLink /> SharePoint Site
                      {bot.links[0] && (
                        <span className="current-url">({bot.links[0].url})</span>
                      )}
                    </button>
                    <LinkStatusDashboard links={bot.links} botId={bot.id} />
                </div>
                <div className="bot-system-prompt">
                    <div className="system-prompt-header">
                        <h4>System Prompt:</h4>
                        <button 
                            className="edit-button"
                            onClick={(e) => {
                                e.preventDefault();
                                const textarea = e.target.closest('.bot-system-prompt').querySelector('textarea');
                                if (!editingPrompts[bot.id]) {
                                    // Entering edit mode
                                    textarea.readOnly = false;
                                    textarea.focus();
                                    setEditingPrompts(prev => ({ ...prev, [bot.id]: true }));
                                } else {
                                    // Saving changes
                                    textarea.readOnly = true;
                                    setEditingPrompts(prev => ({ ...prev, [bot.id]: false }));
                                    handleSystemPromptEdit(bot.id, textarea.value);
                                }
                            }}
                        >
                            {editingPrompts[bot.id] ? <FaSave /> : <FaEdit />}
                        </button>
                    </div>
                    <textarea
                        readOnly={!editingPrompts[bot.id]}
                        value={bot.systemPrompt}
                        onChange={(e) => handleSystemPromptEdit(bot.id, e.target.value)}
                    />
                </div>
                </div>
            )}
          </div>
        ))}
      </div>

      {mode === 'search' && (
        <div className="pagination mobile-pagination">
          <span>
            {`${indexOfFirstBot + 1}-${Math.min(indexOfLastBot, filteredBots.length)}/${filteredBots.length}`}
          </span>
          <div className="pagination-buttons">
            {Array.from({ length: Math.ceil(filteredBots.length / botsPerPage) }, (_, i) => {
              const shouldShow = Math.abs(currentPage - (i + 1)) <= 1;
              return shouldShow ? (
                <button
                  key={i + 1}
                  className={currentPage === i + 1 ? 'active' : ''}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ) : null;
            })}
          </div>
        </div>
      )}

      {contextMenu.show && (
        <div 
          className="context-menu"
          style={{ 
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 1000
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.type === 'bot' && (
            <>
              <button onClick={() => {
                handleDelete(contextMenu.itemId, 'bot');
                setContextMenu({ show: false });
              }}>
                <FaTrash /> Delete Bot
              </button>
            </>
          )}
          
          {contextMenu.type === 'tag' && (
            <>
              <button onClick={() => {
                handleDelete(contextMenu.itemId, 'tag', contextMenu.index);
                setContextMenu({ show: false });
              }}>
                <FaTrash /> Delete Tag
              </button>
            </>
          )}
          
          {contextMenu.type === 'link' && (
            <>
              <button onClick={() => {
                handleDelete(contextMenu.itemId, 'link', contextMenu.index);
                setContextMenu({ show: false });
              }}>
                <FaTrash /> Delete Link
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;